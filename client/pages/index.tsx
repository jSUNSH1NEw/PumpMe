import NavBar from "@/components /base-layout/navigations/navbar";
import { useRouter } from "next/router";

const Home = () => {
  return <NavBar />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({});

export default Home;
