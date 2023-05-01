import "next-auth";
import React from "react";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    /** The user's postal address. */
    address?: string | "";
    isAdmin?: boolean | unknown
  }


  interface JWT {
    isAdmin?: boolean;
  }
}