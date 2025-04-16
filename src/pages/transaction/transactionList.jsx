// @ts-nocheck
import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransactionById, getAllTransactions } from "@/redux/features/transactionSlice";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WorksTable({ setSelectedTransaction, onRefetchReady }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const formatDate = (date) => {
    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-GB").split("/").join("-")
      : "N/A";

    return `${formattedDate}`;
  };
  const { transactions, isLoading } = useSelector((state) => state.transactions);
  const refetch = () => dispatch(getAllTransactions());

  useEffect(() => {
    refetch();
    if (onRefetchReady) {
      onRefetchReady(refetch); 
    }
  }, []);
  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch,setSelectedTransaction])

  return (
    <div className="w-full rounded-md bg-white p-4 ">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="max-h-[620px] overflow-y-auto">
          <Table className="border border-gray-300 w-full rounded-xl ">
            <TableHeader className="bg-muted-light hover:bg-transparent">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-evenly">
                        <button
                          className="w-5 h-5"
                          onClick={() => setSelectedTransaction(transaction)}
                        >
                          <Pencil color="blue" />
                        </button>

                        <button
                          className="w-5 h-5"
                          onClick={async () => {
                            const userConfirmed = window.confirm("Are you sure you want to delete this transaction?");
                            if (userConfirmed) {
                              const response = await dispatch(deleteTransactionById(transaction._id))
                              console.log("RESPONSE", response)
                              if (response.meta.requestStatus === 'fulfilled') {
                                toast({
                                  title: 'Success',
                                  description: "Transaction Deleted Successfully",
                                  variant: "success"
                                })
                                dispatch(getAllTransactions());
                              }
                            }
                          }}
                        >
                          <Trash2 color="red" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
