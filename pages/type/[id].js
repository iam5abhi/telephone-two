import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Carousel from "../../components/carousel/Carousel";

export default function Index() {
  const [category, setCategory] = useState([])

  const getCategotyData = () => {
    fetch("/api/location/get-location", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => { return res.json() }
    ).then((res) => setCategory(res))
  }
  useEffect(() => {
    getCategotyData()
  }, [])
  return (
    <>
    <div>
      <Head>
        <title>Contacts Phone Directory</title>
        <meta name='description' content='Job board app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="max-w-screen mx-auto ">
        <div className="container mx-auto py-5">
          <Carousel />
          <div className="p-4 ">
            <div className=" rounded   mb-4 ">
              <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
              {category.length==0 ? null :<>
                 {category.map((data) => {
                  return <>
                  <Link key={data.id} href={`/type/${data.id}`} ><div><div className="grid2">
                  <div className="max-w-sm rounded-full bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md">
                    <div className="p-5">
                      <a href="#">
                        <h5 className="text-center text-white text-xl md:text-3xl font-semibold tracking-tight uppercase">{data.location}</h5>
                      </a>
                    </div>
                  </div>
                </div></div></Link>
                </>
                })}
                </>
                }
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    

      </>
  );
}