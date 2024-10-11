
interface Props {
  isoDateString: string;
}

const FormattedDate: React.FC<Props> = ({ isoDateString }) => {
  const date = new Date(isoDateString);

  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
    </div>
  );
};

export default FormattedDate;