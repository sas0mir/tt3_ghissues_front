import React, { useState } from 'react';
import store from '../../store';
import { IGridProps } from '../../lib/constants';

const Grid = (props: IGridProps) => {

    const { data, getData, onClick } = props;

    const [page, setPage] = useState(1);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
          getData();
          setPage(page + 1);
          store.setPage(page + 1);
          e.currentTarget.scrollTo(0, scrollHeight);
        }
      };
  

  return (
    <div className="grid gap-4 p-4 h-3/4 w-full" onScroll={handleScroll} style={{ overflowY: 'auto' }}>
      {data.map((item) => (
        <div
            key={item.id}
            onClick={() => onClick(item)}
            className="
            text-lg outline-none border-2 border-gray-400 rounded p-4 mx-4 lg:mx-24 bg-white cursor-pointer
            transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-indigo-100
            "
        >
            <div className='block text-center lg:flex justify-between'>
                <h3 className='font-bold'>{item.title}</h3>
                <p className='font-mono'>{`last update ${new Date(item.updated_at).toLocaleString()}`}</p>
            </div>
          <p className='font-sans text-left '>{`${item.body ? item.body.substring(0, 300) : 'no description'}...`}</p>
        </div>
      ))}
    </div>
  );
};

export default Grid;