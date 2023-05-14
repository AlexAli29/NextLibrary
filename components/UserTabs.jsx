'use client'
import { useUser } from '@/hooks/useUser'
import { useDeleteOrderMutation, useDeleteUserBooksMutation, useGetOrdersMutation, useGetUserBooksMutation } from '@/services/api/handleReqApiSlice'
import { Card, CardBody, CardHeader, Flex, List, ListItem, Spinner, Text } from '@chakra-ui/react'
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Book from '../public/book.jpg';
import { useActions } from '@/hooks/useActions'
import { useBooks } from '@/hooks/useBooks'
import { useOrders } from '@/hooks/useOrders'
export const UserTabs = () => {

  const user = useUser();
  const { setOrders, setBook, deleteFromBooks, deleteFromOrders } = useActions();
  const books = useBooks();
  const orders = useOrders();
  const [getOrders, { isLoading }] = useGetOrdersMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [deleteBook] = useDeleteUserBooksMutation();
  const [getUserBooks, { isLoading: isBooksLoading }] = useGetUserBooksMutation();
  useEffect(() => {
    const fetchOrdersAndBooks = async () => {
      const booksRes = await getUserBooks();
      const res = await getOrders();
      setBook(booksRes.data);
      setOrders(res.data);

    }
    fetchOrdersAndBooks();
  }, [user])

  async function handleDeleteBook(bookId) {
    await deleteBook({ bookId });
    deleteFromBooks(bookId);
  }

  async function handleDeleteOrder(orderId) {
    await deleteOrder({ orderId });
    deleteFromOrders(orderId);
  }

  return (
    <Tab.Group>
      <Tab.List className='bg-gray-200 w-fit px-1 py-1 rounded-lg  flex justify-center space-x-1'>
        <Tab className=' px-3 rounded-lg  focus:outline-none  ui-selected:bg-red-400 ui-selected:text-white '>Books</Tab>
        <Tab className='px-3 rounded-lg ui-selected:bg-red-400 ui-selected:text-white focus:outline-none'>Orders</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          {isBooksLoading ? <Spinner /> :
            <List>
              <>
                {
                  books?.length ? null : <Text fontSize='1.2rem'>You have no books</Text>
                }
              </>
              {
                books?.map((book) => {
                  return (
                    <ListItem w='30rem'>
                      <Card marginBottom='.7rem' fontSize='1.2rem'>
                        <CardBody>
                          <Flex>
                            <Flex w='80%' alignItems='center' flexDirection='column'>
                              <Text >
                                {book.bookName}
                              </Text>
                              <Text fontWeight='hairline'>{book.bookAuthor}</Text>
                            </Flex>
                            <Flex position='relative' w='30%' h='167'>
                              <Image className='rounded-md' fill='true' src={book.bookImage ? book.bookImage : Book}></Image>
                            </Flex>
                          </Flex>
                          <button className='border px-3 py-2 rounded-lg border-red-700 hover:text-white hover:bg-red-500 transition-all active:scale-95' onClick={() => handleDeleteBook(book.bookId)}>
                            Delete
                          </button>
                        </CardBody>

                      </Card>
                    </ListItem>
                  )
                })
              }
            </List>
          }
        </Tab.Panel>
        <Tab.Panel className='mt-4'>
          {isLoading ? <Spinner /> :
            <List>
              <>
                {
                  orders?.length ? null : <Text fontSize='1.2rem'>You have no orders</Text>
                }
              </>
              {
                orders?.map((order) => {
                  return (
                    <ListItem w='30rem'>
                      <Card marginBottom='.7rem' fontSize='1.2rem'>
                        <CardBody>
                          <Flex>
                            <Flex w='80%' alignItems='center' flexDirection='column'>
                              <Text >
                                {order.bookName}
                              </Text>
                              <Text fontWeight='hairline'>{order.bookAuthor}</Text>
                            </Flex>
                            <Flex position='relative' w='30%' h='167'>
                              <Image className='rounded-md' fill='true' src={order.bookImage ? order.bookImage : Book}></Image>
                            </Flex>
                          </Flex>
                          <button className='border px-3 py-2 rounded-lg border-red-700 hover:text-white hover:bg-red-500 transition-all active:scale-95' onClick={() => handleDeleteOrder(order.orderId)}>
                            Cancel
                          </button>
                        </CardBody>

                      </Card>
                    </ListItem>
                  )
                })
              }
            </List>
          }
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
