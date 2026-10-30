import type { Metadata } from "next";
import { AccountShell } from "@/components/account/AccountShell";
import { WishlistView } from "@/components/account/WishlistView";

export const metadata: Metadata = { title: "Favoritos" };

export default function WishlistPage() {
  return (
    <AccountShell active="wishlist" crumb="Favoritos">
      <WishlistView />
    </AccountShell>
  );
}
