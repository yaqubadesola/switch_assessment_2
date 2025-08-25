import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export const api = axios.create({
  baseURL: "/api",
});

const mock = new MockAdapter(api, { delayResponse: 1000 });

// In-memory fake database
let users = [
  {
    id: 1,
    username: "switch_user",
    password: "123456",
    email: "switch_user@gmail.com",
    name: "Switch User",
  },
];

let accountsDB = {
  1: [
    {
      id: "acc1",
      type: "Savings",
      number: "1234567890",
      balance: 250000,
      lastTransactionDate: "2025-08-10",
    },
    {
      id: "acc2",
      type: "Current",
      number: "9876543210",
      balance: 1800000,
      lastTransactionDate: "2025-08-11",
    },
    {
      id: "acc3",
      type: "Loan",
      number: "5555333377",
      balance: -350000,
      lastTransactionDate: "2025-08-09",
    },
  ],
};

//Seeding data for Transactions based on specific Account type
const generateTransactions = (accountId) => {
  let transactions = [];

  // 3 credit transactions
  for (let i = 1; i <= 10; i++) {
    transactions.push({
      accountId,
      date: `2025-08-0${i}`,
      description: `Payment Received ${i}`,
      type: "credit",
      amount: Math.floor(Math.random() * 50000) + 10000,
      balance: Math.floor(Math.random() * 500000) + 50000,
    });
  }

  // 3 debit transactions
  for (let i = 11; i <= 20; i++) {
    transactions.push({
      accountId,
      date: `2025-08-0${i}`,
      description: `Purchase ${i}`,
      type: "debit",
      amount: Math.floor(Math.random() * 40000) + 5000,
      balance: Math.floor(Math.random() * 500000) + 50000,
    });
  }

  return transactions;
};

// Transaction DB with 6 records for each account
let transactionsDB = {
  acc1: generateTransactions("acc1"),
  acc2: generateTransactions("acc2"),
  acc3: generateTransactions("acc3"),
};

// ===== AUTH =====

mock.onPost("/login").reply((config) => {
  //
  const { username, password } = JSON.parse(config.data);
  console.log({ username, password });
  const user = users.find(
    (u) =>
      u.username === username && (u.password === password || password === "")
  );
  if (!user) {
    return [401, { message: "Invalid credentials" }];
  }
  return [200, { token: "fake-token-" + username }];
});

mock.onGet("/profile").reply((config) => {
  const token = config.headers.Authorization?.replace("Bearer ", "");
  const username = token?.replace("fake-token-", "");
  const user = users.find((u) => u.username === username);
  if (!user) return [401, { message: "Unauthorized" }];
  return [200, { name: user.name, email: user.email }];
});

// ===== ACCOUNTS =====
mock.onGet("/accounts").reply((config) => {
  const token = config.headers.Authorization?.replace("Bearer ", "");
  const username = token?.replace("fake-token-", "");
  const user = users.find((u) => u.username === username);
  if (!user) return [401, { message: "Unauthorized" }];
  return [200, accountsDB[user.id] || []];
});

// ===== TRANSACTIONS =====
mock.onGet(/\/accounts\/\w+\/transactions/).reply((config) => {
  const token = config.headers.Authorization?.replace("Bearer ", "");
  const username = token?.replace("fake-token-", "");
  const user = users.find((u) => u.username === username);
  if (!user) return [401, { message: "Unauthorized" }];

  const accountId = config.url.match(/\/accounts\/(\w+)\/transactions/)[1];
  const transactions = transactionsDB[accountId] || [];
  const account = Object.values(accountsDB)
    .flat()
    .find((acc) => acc.id === accountId);
  return [200, { transactions, account }];
});

//=========TRANSFER =======

mock.onPost("/transfers").reply((config) => {
  const token = config.headers.Authorization?.replace("Bearer ", "");
  const username = token?.replace("fake-token-", "");
  const user = users.find((u) => u.username === username);
  if (!user) return [401, { message: "Unauthorized" }];

  const transfer = JSON.parse(config.data);
  if (!transfer.beneficiary || !transfer.amount) {
    return [400, { message: "Invalid transfer data" }];
  }

  return [
    200,
    {
      message: "Transfer successful",
      reference: "TXN" + Date.now(),
      status: "completed",
      ...transfer,
    },
  ];
});

export default api;
