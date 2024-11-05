import React from "react";
import Link from "next/link";

interface LinkArtigoProps {
  title: string;
  author: string;
  date: string;
  link: string;
}

const LinkArtigo: React.FC<LinkArtigoProps> = ({ title, author, date, link }) => (
  <div className="articleCard">
    <Link href={link}>
      <h3 className="articleTitle">{title}</h3>
      <p className="articleInfo">
        Autor: {author} | Data: {date}
      </p>
    </Link>
  </div>
);

export default LinkArtigo;
