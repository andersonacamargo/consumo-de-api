export default function ExternalLink({link, nome}) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {nome} 
    </a>
  );
}