export const defaultTokenAbi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function allowance(address owner, address spender) external view returns (uint256)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint256 amount) external returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
];

export const dispatchABI = [
  // "function disperseEther(address[] recipients, uint256[] values) external payable",

  "function disperseToken(address token, address[] recipients, uint256[] values) external",

  // "function disperseTokenSimple(address token, address[] recipients, uint256[] values) external",
];