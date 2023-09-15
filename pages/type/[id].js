import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Carousel from "../../components/carousel/Carousel";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter()
  const {id} = router.query;
  const [category, setCategory] = useState([])

  const getCategotyData = () => {
    fetch("/api/get-category", {
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
                 <Link href={`/properties/${id}`} ><div><div className="grid2">
                      <div className="max-w-sm rounded-full bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md">
                        <div className="p-5">
                            <h5 className="text-center  text-white text-xl md:text-3xl font-semibold tracking-tight uppercase">properties</h5>
                        </div>
                      </div>
                    </div></div>
                  </Link>
                 {category.map((data) => {
                  return <>
                  <Link key={data.id} href={`/contacts/${data.id}/${id}`} ><div><div className="grid2">
                  <div className="max-w-sm rounded-full bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md">
                    <div className="p-5">
                      <a href="#">
                        <h5 className="text-center text-white text-xl md:text-3xl font-semibold tracking-tight uppercase">{data.category}</h5>
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