import React, { useEffect, useState } from "react";

const Pagination = ({ totalCount, page, setPage, perPageLimit }) => {
  const [pages, setPages] = useState([]);
  let totalPage = Math.round(totalCount / perPageLimit);

  useEffect(() => {
    if (totalPage > 0) {
      let temp = [];
      for (let i = 1; i <= totalPage; i++) {
        if (i <= 5) {
          temp.push(i);
        }
      }
      setPages(temp);
    }
  }, [totalPage]);

  const handleNext = () => {
    let pgs = [...pages];
    if (pgs[pgs.length - 1] < totalPage) {
      pgs.shift();
      pgs.push(pgs[pgs.length - 1] + 1);
      setPages(pgs);
      setPage(page + 1);
    }
  };
  const handlePerv = () => {
    let pgs = [...pages];
    if (pgs[0] > 1) {
      pgs.pop();
      pgs.unshift(pgs[0] - 1);
      setPages(pgs);
      setPage(page - 1);
    }
  };
  const handleItem = (item) => {
    setPage(item);
  };
  return (
    <div className="flex gap-x-4 my-4">
      <button onClick={handlePerv} disabled={pages.includes(1)} className=" disabled:bg-gray-500 px-4 py-2 bg-gray-800 text-white rounded-md">Prev</button>
      {pages && pages.length > 0
        ? pages.map((item, ind) => (
            <button
              key={ind}
              className={`${item === page ? "bg-gray-400":"bg-gray-200"}  w-10 text-black  py-2 rounded-md`}
              onClick={() => handleItem(item)}
            >
              {item}
            </button>
          ))
        : ""}
      <button onClick={handleNext} disabled={pages.includes(totalPage)}  className="disabled:bg-gray-500 px-4 py-2 bg-gray-800 text-white rounded-md">Next</button>
    </div>
  );
};

export default Pagination;