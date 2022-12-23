import { getSession } from "next-auth/react";
import Head from "next/head";
import { Banner, Header, ProductFeed } from "../components";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazone</title>
      </Head>

      {/* Header*/}
      <Header />

      {/* Main Container */}
      <main className="mx-auto max-w-screen-2xl">
        {/* Banner */}
        <Banner />

        {/* ProductFeed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

// Export database Api
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch(" https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
      session,
    },
  };
}
