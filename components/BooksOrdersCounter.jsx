'use client'

import { useBooks } from "@/hooks/useBooks"
import { useOrders } from "@/hooks/useOrders";

export const BooksOrdersCounter = () => {
  const books = useBooks();
  const orders = useOrders();
  return (
    <div class="flex justify-center py-4 lg:pt-4 pt-8">
      <div class="mr-4 p-3 text-center">
        <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{orders.length}</span><span class="text-sm text-blueGray-400">Orders</span>
      </div>
      <div class="mr-4 p-3 text-center">
        <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{books.length}</span><span class="text-sm text-blueGray-400">Books</span>
      </div>
    </div>
  )
}
