import { findTokenDataType, findTokenValue } from "./tokens-find.js";
import { isAllDigits } from "./utility.js";

function parseVariableDeclaration(tokens, index, kind) {
  // [let, x, =, 10]

  // we are at 0th index
  // let + 1 = variable name
  // let + 2 = assignment
  // let + 3 = value

  //JS goes through code in 2 phases
  //in first it only declared nodes

  //Memory Phase 1:
  {
    let x = undefined;
    let y = undefined;
  }

  //Memory Phase 2:
  {
    let x = 10;
    let y = 20;
  }

  //create two nodes: declaration node, assignment node

  const declarationNode = {
    nodeType: "VariableDeclaration",
    metaData: {
      name: tokens[index + 1],
      value: undefined,
      kind: kind,
      dataType: findTokenDataType(tokens, index),
    },
  };

  const assignmentNode = {
    nodeType: "VariableAssignment",
    metaData: {
      name: tokens[index + 1],
      dataType: findTokenDataType(tokens, index),
      value: findTokenValue(tokens, index),
    },
  };
  return { declarationNode, assignmentNode, newIndex: index + 4 };
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

export { parseVariableDeclaration, parsePrintStatement };
