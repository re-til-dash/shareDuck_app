import { useEffect } from "react";
import { useLoaderData } from "react-router";

export default function Home() {
  const result = useLoaderData();

  //   const navigate = useNavigate();

  // const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!result) {
      //navigate("/login");
    }
  }, []);

  return <section>{typeof result === "string" && result}</section>;
}
