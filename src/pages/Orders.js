import { useSession, getSession } from "next-auth/react";
import React from "react";
import Header from "../components/Header";
import moment from "moment";

import Order from "../components/Order";
import database from "../../firebase";

function Orders({ orders }) {
  const { data: session } = useSession();

  console.log(orders);

  return (
    <div>
      <Header />

      <main className="mx-auto max-w-screen-lg p-10">
        <h1 className="mb-2 border-b border-yellow-400 pb-1 text-3xl">
          Your Orders
        </h1>

        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to se your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  //   User credentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  //  firebase db
  const stripeOrders = await database
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      amountShipping: order.data().amount_shipping,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
