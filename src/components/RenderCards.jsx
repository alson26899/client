import React from 'react';
import Card from './Card';

const RenderCards = ({ data, title }) => {
  let toRender =
    data?.length > 0 ? (
      data.map((post) => (
        <Card
          key={post._id}
          {...post}
        />
      ))
    ) : (
      <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
        {title}
      </h2>
    );
  return toRender;
};

export default RenderCards;
