import React, { useState ,useEffect} from "react";
import useProcessor from "@/src/Hooks/useProcessor";
import { updateProcessorsUrl } from "@/src/Utils/Urls/CommonUrl";

const ManageProcessor = () => {
  const { handelProcessorDelete, ProcessorData,refetchProcessor } = useProcessor();
  const [processorData, setProcessorData] = useState([]);

  useEffect(() => {
    setProcessorData(ProcessorData);
  }, [ProcessorData]);

  const handleSelectChange = async (e, currentIndex) => {
    const selectedValue = parseInt(e.target.value, 10);

    // Update the selected index in the local state
    const updatedProcessorData = processorData.map((processor, index) => {
      if (index === currentIndex) {
        return {
          ...processor,
          processorRank: selectedValue,
        };
      }
      return processor;
    });

    setProcessorData(updatedProcessorData);

    try {
      // Get the ID of the current processor
      const currentProcessorId = updatedProcessorData[currentIndex]?._id;

      // Update the specific processor using its ID
      const response = await fetch(updateProcessorsUrl(currentProcessorId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          processorRank: selectedValue,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update processor:", response.statusText);
        refetchProcessor()
      }
    } catch (error) {
      console.error("Error updating processor:", error);
    }
  };

  // Sort the processor data based on processRank
  const sortedProcessorData = Array.isArray(processorData)
  ? [...processorData].sort((a, b) => a.processorRank - b.processorRank)
  : [];
console.log(sortedProcessorData, "sortedProcessorData")
  return (
    <section className="container px-4 mx-auto">
      <div className="flex flex-col">
        <div className="  overflow-x-auto sm:-mx-6 ">
          <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Processor Rank
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Processor Name
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Action
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Update Rank
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {sortedProcessorData &&
                    sortedProcessorData?.map((Processor, Index) => {
                      console.log(Processor.id, "handelProcessorDelete");
                      return (
                        <tr key={Index}>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {Processor?.processorRank}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {Processor?.processorName}
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <button
                                className="text-red-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                                onClick={() =>
                                  handelProcessorDelete(Processor?._id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <div>
                              <select
                                value={Processor?.processorRank}
                                onChange={(e) => handleSelectChange(e, Index)}
                                className="border rounded px-2 py-1 text-[1.5rem] text-center text-[#000]"
                              >
                                <option value="">Select Index</option>
                                {sortedProcessorData.map((_, i) => (
                                  <option
                                    key={i}
                                    value={i + 1}
                                    className="text-[1.5rem] text-center"
                                  >
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProcessor;
