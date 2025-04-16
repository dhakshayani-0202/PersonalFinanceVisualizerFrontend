// @ts-nocheck
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createTransaction, updateTransaction } from "@/redux/features/transactionSlice";
import { useDispatch } from "react-redux";

// Validation Schema
const transactionSchema = z.object({
  date: z.string().min(1, "Date is required"),
  category: z.enum([
    "Food",
    "Transport",
    "Utilities",
    "Shopping",
    "Rent",
    "Entertainment",
    "Health",
    "Other",
  ]),
  amount: z.coerce.number().min(0.01, "Amount is required"),
  description: z.string().optional(),
});

const categories = [
  "Food",
  "Transport",
  "Utilities",
  "Shopping",
  "Rent",
  "Entertainment",
  "Health",
  "Other",
];

const TransactionForm = ({ selectedTransaction, setSelectedTransaction, refreshTransactions }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  const onSubmit = async (data) => {
    let response;
    if (selectedTransaction) {
      data._id = selectedTransaction._id;
      response = await dispatch(updateTransaction({ id: selectedTransaction._id, updatedData: { ...data } }));
    } else {
      response = await dispatch(createTransaction(data));
    }
    if (response.payload?.success||response.meta.requestStatus==='fulfilled') {
      toast({
        title: "Success",
        description: selectedTransaction ? "Transaction Updated" : "Transaction Created",
        variant: "success",
      });
      refreshTransactions();
      setSelectedTransaction(null);
      reset();
    }
  };

  useEffect(() => {
    if (selectedTransaction) {
      setValue("date", selectedTransaction.date?.split("T")[0]);
      setValue("category", selectedTransaction.category);
      setValue("amount", selectedTransaction.amount);
      setValue("description", selectedTransaction.description || "");
    } else {
      reset(); // clear form when switching back to create
    }
  }, [selectedTransaction]);

  return (
    <div className="flex flex-col gap-4 p-4 border bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold">Add Transaction</h2>

      {/* Date */}
      <div className="w-36">
        <Label>Date</Label>
        <Input type="date" {...register("date")} />
        {errors.date && (
          <p className="text-red-500 text-xs">{errors.date.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <Label>Category</Label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-xs">{errors.category.message}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <Label>Amount</Label>
        <Input
          type="number"
          step="0.01"
          placeholder="Enter amount"
          {...register("amount")}
        />
        {errors.amount && (
          <p className="text-red-500 text-xs">{errors.amount.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <Label>Description (Optional)</Label>
        <Textarea
          placeholder="Enter description"
          {...register("description")}
        />
      </div>

      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  );
};

export default TransactionForm;
