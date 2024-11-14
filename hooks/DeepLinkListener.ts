import { useEffect } from "react";
import { Linking } from "react-native";
import { useRouter } from "expo-router";

const DeepLinkListener = () => {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;

      //ToDo: check this
      if (path === "/magic-link") {
        router.push("/RestorePssword2");
      } else {
        console.log("Deep link no reconocido", path);
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, [router]);

  return null;
};

export default DeepLinkListener;
