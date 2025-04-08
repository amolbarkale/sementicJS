import chalk from "chalk";
import { findTokenDataType, findTokenValue } from "./tokens-find.js";
import { isAllDigits } from "./utility.js";

function ParseVariableStatement(tokens, index, kind) {
  // Node for variable assignment
  const variableNode = {
    nodeType: "VariableDeclaration",
    metaData: {
      name: tokens[index + 1],
      dataType: findTokenDataType(tokens, index),
      value: findTokenValue(tokens, index),
      kind: kind,
    },
  };

  return {
    variableNode,
    newIndex: index + 4,
  };
}

// Helper function to consume tokens and return a metadata object for print statements
//1] print(arr)
//2] ["print", "(", "arr", ")"]

function parsePrintStatement(index, tokens) {
  const node = {
    nodeType: "PrintStatement",
    metaData: {
      toPrint: [], // to be filled with the printed value or expression
    },
  };
  index += 2; // Move past 'print' and '(' tokens

  while (tokens[index] !== ")") {
    node.metaData.toPrint.push(tokens[index]);
    index++;
  }

  //taking care that print(1234) does not get treated as variable

  node.metaData.printType =
    node.metaData.toPrint.length === 1 && !isAllDigits(node.metaData.toPrint)
      ? "variable"
      : "literal";

  return { node, newIndex: index + 1 }; // +1 to move past the closing ')'
}

function parseFunctionStatement(tokens, index) {
  //function name, function body

  console.log(chalk.blue("Parsing Function here:"));

  let functionName = tokens[index];
  console.log("functionName:", functionName);

  // we need to find function body
  let bodyStartIndex = index + 5;
  console.log("bodyStartIndex:", bodyStartIndex);

  let bodyLastIndex = bodyStartIndex;
  console.log("bodyLastIndex:", bodyLastIndex);
  // increament body last index till it reaches "}"

  while (tokens[bodyLastIndex] !== "}") {
    bodyLastIndex++;
  }

  let bodyTokens = tokens.slice(bodyStartIndex, bodyLastIndex);
  console.log("bodyTokens:", bodyTokens);
}

export { ParseVariableStatement, parsePrintStatement, parseFunctionStatement };
