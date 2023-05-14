'use client'
import { useUser } from '@/hooks/useUser'
import { useAddUserBooksMutation, useDeleteOrderMutation, useGetOrdersMutation, useGetAllUsersMutation } from '@/services/api/handleReqApiSlice'
import { Card, CardBody, Flex, List, ListItem, Spinner, Text } from '@chakra-ui/react'
import { Tab } from '@headlessui/react'
import Image from 'next/image';
import { useEffect } from 'react'
import Book from '../public/book.jpg';
import { useOrders } from '@/hooks/useOrders'
import { useActions } from '@/hooks/useActions'
import { useState } from 'react'
export const AdminTabs = () => {

  const user = useUser();
  const orders = useOrders();
  const { setOrders, deleteFromOrders } = useActions();
  const [users, setUsers] = useState();
  const [getAllUsers, { isLoading: isUsersLoading }] = useGetAllUsersMutation();
  const [getOrders, { isLoading }] = useGetOrdersMutation();
  const [addUserBooks] = useAddUserBooksMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      const res = await getOrders();
      const resUsers = await getAllUsers();
      setOrders(res.data);
      setUsers(resUsers.data);
    }
    fetchOrdersAndUsers();
  }, [user])

  async function handleDeleteOrder(orderId) {
    await deleteOrder({ orderId });
    deleteFromOrders(orderId);
  }

  async function handleConfirmOrder(userId, bookId, orderId) {
    await addUserBooks({ userId, bookId });
    await deleteOrder({ orderId });
    deleteFromOrders(orderId);

  }

  return (
    <Tab.Group>
      <Tab.List className='bg-gray-200 w-fit px-1 py-1 rounded-lg  flex justify-center space-x-1'>
        <Tab className=' px-3 rounded-lg  focus:outline-none  ui-selected:bg-red-400 ui-selected:text-white '>Users</Tab>
        <Tab className='px-3 rounded-lg ui-selected:bg-red-400 ui-selected:text-white focus:outline-none'>Orders</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className='mt-4'>
          {isUsersLoading ? <Spinner /> :
            <List>
              <>
                {
                  users?.length ? null : <Text fontSize='1.2rem'>No users registered</Text>
                }
              </>
              {
                users?.map((user) => {
                  return (
                    <ListItem w='30rem'>
                      <Card marginBottom='.7rem' fontSize='1.2rem'>
                        <CardBody>
                          <Flex>
                            <Flex w='80%' alignItems='start' flexDirection='column'>
                              <Text >
                                User name: {user.userName}
                              </Text>
                              <Text fontWeight='hairline'>
                                Email: {user.userEmail}
                              </Text>

                            </Flex>

                          </Flex>
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
                  orders?.length ? null : <Text fontSize='1.2rem'>No incoming orders</Text>
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
                              <Text >User:{order.userName}</Text>
                            </Flex>
                            <Flex position='relative' w='30%' h='167'>
                              <Image className='rounded-md' fill='true' src={order.bookImage ? order.bookImage : Book}></Image>
                            </Flex>
                          </Flex>
                          <div className='flex space-x-2 justify-center'>
                            <button className='border px-3 py-1 rounded-lg border-red-700 hover:text-white hover:bg-red-500 transition-all active:scale-95' onClick={() => handleDeleteOrder(order.orderId)}>
                              Deny
                            </button>
                            <button className='border px-3 py-1 rounded-lg border-emerald-400 hover:text-white hover:bg-emerald-400  transition-all active:scale-95' onClick={() => handleConfirmOrder(order.userId, order.bookId, order.orderId)}>
                              Confirm
                            </button>
                          </div>
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
