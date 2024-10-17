import { FC, useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import { Input } from '@/components/UI/input';
import { Button } from '@/components/UI/button';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';
import { useSas } from '@/hooks/useSas';

interface UploadPictureProps {
    pictureLink: string;
    setPictureLink: (link: string) => void;
}

const UploadPicture: FC<UploadPictureProps> = ({ pictureLink, setPictureLink }) => {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(pictureLink);
    const [uploading, setUploading] = useState(false);
    const sasUrl = useSas();
    // const sasUrl = import.meta.env.VITE_SAS_URI;

    const uploadFile = async () => {
        if (!file || !sasUrl) return

        // Підпис з обмеженим доступом SAS
        

        console.log(sasUrl)

        const blobServiceClient = new BlobServiceClient(sasUrl);
        const containerClient = blobServiceClient.getContainerClient('donmacaronpictures');

        try {
            setUploading(true);
            const uniqueFileName = `${uuidv4()}.webp`;
            // Стиснення зображення
            const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true });

            // Конвертація у WebP
            const webPFile = await imageCompression.getFilefromDataUrl(await imageCompression.getDataUrlFromFile(compressedFile), 'image/webp');
            console.log(webPFile);

            const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);

            const options = {
                blobHTTPHeaders: {
                    blobContentType: file.type, // Встановлюємо тип як image/webp
                },
            };

            // Завантаження файлу
            await blockBlobClient.uploadData(webPFile, options);

            const uploadedImageUrl = `${containerClient.url.replace(/\?.*$/, '')}/${encodeURIComponent(uniqueFileName)}`;
            setImageUrl(uploadedImageUrl);
            setPictureLink(uploadedImageUrl);
            setUploading(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploading(false);
        }
    };

    return (
        <div>
            {pictureLink && <p className='mb-4 p-2 font-light border rounded-md text-sm'>{pictureLink}</p>}
            <div className='flex justify-between mb-4 space-x-2'>
                <Input 
                    id="picture" 
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)} 
                />

                <Button onClick={uploadFile} disabled={uploading || !file}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </Button>
            </div>

            {imageUrl && (
                <div className='flex justify-start space-x-4'>
                    <div className='flex items-center'><h3>Uploaded Image:</h3></div>
                    <div className="bg-gray-100 relative border rounded-xl p-2">
                        <img src={imageUrl} alt="Uploaded" className='max-w-[100px] h-auto' />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadPicture;