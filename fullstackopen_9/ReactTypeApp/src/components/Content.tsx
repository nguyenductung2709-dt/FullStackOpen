import Part from './Part';

interface ContentProps {
  courseParts: any[]; 
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <Part courseParts={courseParts} />
  );
}

export default Content;
