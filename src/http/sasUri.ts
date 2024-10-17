import apiProtected from "./apiProtected"

export const getSasUri = async () => {
    const response = await apiProtected.get(`api/BlobSas/generate-sas`)
    return response.data;
}