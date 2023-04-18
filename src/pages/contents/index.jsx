import React from "react";
import ContentCard from "../../components/cards/ContentCard";

const Contents = ({ data }) => {
  return (
    <div className='flex flex-wrap justify-center'>
      {data?.map((item) => (
        <ContentCard
          key={`ct-${item.id}-${item.title}`}
          imgSrc={item.image_url}
          linkTo={`/content/jobs/${item.id}`}
          linkText={item.title}
        />
      ))}
    </div>
  );
};

export default Contents;
