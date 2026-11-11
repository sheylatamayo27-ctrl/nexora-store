import { AuthSkeleton } from "@/components/skeletons/blocks";

export default function LoadingForgotPassword() {
  return <AuthSkeleton fields={1} social={false} />;
}
