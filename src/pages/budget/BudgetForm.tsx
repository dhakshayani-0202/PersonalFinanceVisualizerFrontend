// @ts-nocheck
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  createBudget,
  getAllBudgets,
  updateBudget,
} from "@/redux/features/budgetSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";

// Categories
const categories = [
  "Food",
  "Transport",
  "Health",
  "Entertainment",
  "Rent",
  "Utilities",
  "Shopping",
  "Other",
];

// Schema
const budgetSchema = z.object(
  categories.reduce((acc, cat) => {
    acc[cat] = z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Budget must be a number ≥ 0",
      });
    return acc;
  }, {} as Record<string, any>)
);

type BudgetSchemaType = z.infer<typeof budgetSchema>;

export default function BudgetForm() {
  const { budgets, isLoading } = useSelector((state: any) => state.budget);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BudgetSchemaType>({
    resolver: zodResolver(budgetSchema),
    defaultValues: categories.reduce((acc, cat) => {
      acc[cat] = "";
      return acc;
    }, {} as Record<string, any>),
  });

  
  const onSubmit = async (data: BudgetSchemaType) => {
    const payload = { categories: { ...data } };

    if (budgets.length > 0) {
      const response = await dispatch(
        updateBudget({ id: budgets[0]._id, updatedData: payload })
      );
      if (response.meta?.requestStatus) {
        toast({
          title: "Budgets Updated",
          description: "Your budgets have been updated successfully.",
          variant: "success",
        });
      }
    } else {
      const response = await dispatch(createBudget(payload));
      if (response.payload?.success) {
        toast({
          title: "Budgets Saved",
          description: "Your budgets have been saved successfully.",
          variant: "success",
        });
      }
    }
  };

  useEffect(() => {
    dispatch(getAllBudgets());
  }, [dispatch]);

  useEffect(() => {
    if (budgets.length > 0 && budgets[0]?.categories) {
      reset(budgets[0].categories);
    }
  }, [budgets, reset]);

if(isLoading){
    return(<div>
        <Loader className="mt-48"/>
    </div>)
}

  return (
    <div className="flex flex-col gap-4 p-4 border bg-white rounded-lg shadow-md w-full text-center">
      <h2 className="text-lg font-semibold">Set Monthly Budgets</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category} className="text-left">
            <Label>{category}</Label>
            <Input
              type="number"
              min="0"
              placeholder="Enter budget"
              {...register(category)}
            />
            {errors[category] && (
              <p className="text-red-500 text-xs">{errors[category]?.message}</p>
            )}
          </div>
        ))}

        <div className="col-span-2 mt-2">
          <Button type="submit" className="w-full">
            {budgets.length > 0 ? "Update Budgets" : "Save Budgets"}
          </Button>
        </div>
      </form>
    </div>
  );
}
