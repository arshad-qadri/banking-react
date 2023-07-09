import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../services/userContext";
import Pagination from "../../components/Pagination";

const Table = () => {
  const [data, setData] = useState([]);
  const userCtx = useContext(UserContext)[0];
  const [page, setPage] = useState(1);
  let limit = 6;

  function skipAndTakeNext(arr, skipCount, takeCount) {
    return arr.slice(skipCount, skipCount + takeCount);
  }
  useEffect(() => {}, []);
  useEffect(() => {
    const tableData = skipAndTakeNext(userCtx?.data, (page - 1) * limit, limit);
    setData(tableData);
  }, [page, userCtx?.data]);

  return (
    <div className="flex flex-col">
      <div className=" overflow-x-auto  max-w-5xl sm:max-w-full px-2 ">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className=" overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Transfer Amount
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Transfer Currancy
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody>
                {data && data?.length > 0
                  ? data?.map((item, ind) => (
                      <tr
                        className="border-b dark:border-neutral-500"
                        key={ind}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {ind + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.customer_info?.customer_name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.transfer_amount}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.transfer_currancy}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.reference}
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>

          </div>
        </div>
      </div>
            <Pagination
              totalCount={userCtx?.data?.length}
              page={page}
              setPage={setPage}
              perPageLimit={limit}
            />
    </div>
  );
};

export default Table;
