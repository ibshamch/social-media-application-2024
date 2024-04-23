import { useContext } from "react";
import AccountDetailsContext from "../context/accountDetails";
function useAccountDetailsContext() {
  return useContext(AccountDetailsContext);
}

export default useAccountDetailsContext;
