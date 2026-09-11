import { Suspense } from "react";
import OrderFlow from "./OrderFlow";

export const metadata = {
  title: "Order Firewood — Big Sky Firewood",
  description: "Order seasoned firewood online in under a minute. Pick your wood, pick your day, we handle the rest.",
};

export default function BigSkyOrderPage() {
  return (
    <Suspense fallback={null}>
      <OrderFlow />
    </Suspense>
  );
}
