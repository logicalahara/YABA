
import { Request, Response } from "express";
import {
  Configuration,
  CountryCode,
  DepositoryAccountSubtype,

  LinkTokenCreateRequest,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";

const configuration: Configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

const plaid = async (_: Request, res: Response) => {
  // res.send("YABA backend server"); // Send a response to the client
  const request: LinkTokenCreateRequest = {
    user: {
      client_user_id: "user-id",
    },
    client_name: "Plaid Test App",
    products: [Products.Auth, Products.Transactions],
    country_codes: [CountryCode.Us],
    language: "en",
    webhook: "https://sample-web-hook.com",
    // redirect_uri: "https://localhost:3010",
    account_filters: {
      depository: {
        account_subtypes: [
          DepositoryAccountSubtype.Checking,
          DepositoryAccountSubtype.Savings,
        ],
      },
    },
  };
  try {
    const linkTokenCreateResponse = await plaidClient.linkTokenCreate(request);
    const linkToken = linkTokenCreateResponse.data.link_token;
    // console.log("linkToken", linkToken);
    // const getrequest: LinkTokenGetRequest = {
    //   link_token: linkToken,
    // };
    // try {
    //   const data = await plaidClient.linkTokenGet(getrequest);
    //   console.log(data);
    //   res.status(200).send(response.data);
    // } catch (e) {
    //   console.log(e);
    // }
    try {
      const itemPublicTokenExchangeResponse = await plaidClient.itemPublicTokenExchange(
        { public_token: linkToken, }
      );
      const accessToken = itemPublicTokenExchangeResponse.data.access_token;
      const itemId = itemPublicTokenExchangeResponse.data.item_id;
      console.log({ accessToken: accessToken, itemId: itemId });
    } catch (err) {
      // console.log(err);
    }
  } catch (e) {
    // console.log(e);
  }
  // const publicTokenRequest: SandboxPublicTokenCreateRequest = {
  //   institution_id: "ins_109512",
  //   initial_products: [Products.Auth, Products.Transactions],
  // };
  // try {
  //   const publicTokenResponse = await plaidClient.sandboxPublicTokenCreate(
  //     publicTokenRequest
  //   );
  //   const publicToken = publicTokenResponse.data.public_token;
  //   // The generated public_token can now be exchanged
  //   // for an access_token
  //   const exchangeRequest: ItemPublicTokenExchangeRequest = {
  //     public_token: publicToken,
  //   };
  //   const exchangeTokenResponse = await plaidClient.itemPublicTokenExchange(
  //     exchangeRequest
  //   );
  //   const accessToken = exchangeTokenResponse.data.access_token;
  //   console.log(accessToken);
  //   const request: TransactionsGetRequest = {
  //     access_token: accessToken,
  //     start_date: "2018-01-01",
  //     end_date: "2020-02-01",
  //   };
  //   try {
  //     const response = await plaidClient.transactionsGet(request);
  //     let transactions = response.data.transactions;
  //     console.log(transactions);
  //     const total_transactions = response.data.total_transactions;
  //     // Manipulate the offset parameter to paginate
  //     // transactions and retrieve all available data
  //     while (transactions.length < total_transactions) {
  //       const paginatedRequest: TransactionsGetRequest = {
  //         access_token: accessToken,
  //         start_date: "2018-01-01",
  //         end_date: "2020-02-01",
  //         options: {
  //           offset: transactions.length,
  //         },
  //       };
  //       const paginatedResponse = await plaidClient.transactionsGet(
  //         paginatedRequest
  //       );
  //       transactions = transactions.concat(paginatedResponse.data.transactions);
  //       res.send(transactions);
  //     }
  //   } catch (error) {
  //     // handle error
  //     console.log(error);
  //   }
  // } catch (error) {
  //   // handle error
  //   console.log(error);
  // }
  return res.status(200).send("plaid endpoint")
};
export default { plaid };