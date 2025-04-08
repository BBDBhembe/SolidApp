import { Show, JSX } from "solid-js";
import { Navigate } from "@solidjs/router";
import { isAuthenticated } from "../auth";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  return (
    <Show
      when={isAuthenticated()}
      fallback={<Navigate href="/" />}
    >
      {props.children}
    </Show>
  );
}