// import React from "react";

// const AttackCard = () => {
//   const attacks = [
//     { name: "Screen Replay Attack", value: "xxxx" },
//     { name: "Printed Copy Attack", value: "xxxx" },
//     { name: "Portrait Replace Attack", value: "xxxx" },
//   ];

//   return (
//     <div className="rounded-[20px] h-[600px] overflow-y-auto scrollBarThin bg-white p-4">
//       {/* Header */}
//       <div className="bg-primary/10 text-primary text-center font-semibold h-[37px] flex items-center justify-center rounded-full">
//         Spoof
//       </div>
//       {/* Content */}
//       <div className="border mt-5 rounded-[20px] py-2">
//         {attacks.map((attack, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center py-2  p-3"
//           >
//             <span className="text-[16px] text-black font-normal">{attack.name}</span>
//             <span className="text-[16px] text-[#7E7E7EE5] font-normal">{attack.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AttackCard;

// import React from "react";

// type AttackCardProps = {
//   attackMethod: string;
//   livenessProbability: number;
//   livenessScore: number;
//   qualityScore: number;
//   state: string;
// };

// const AttackCard: React.FC<AttackCardProps> = ({
//   attackMethod,
//   livenessProbability,
//   livenessScore,
//   qualityScore,
//   state,
// }) => {
//   console.log(
//     attackMethod,
//     livenessProbability,
//     livenessScore,
//     qualityScore,
//     state
//   );
//   return (
//     <div className="rounded-[20px] h-[600px] overflow-y-auto bg-white p-4 shadow-md">
//       {/* Header */}
//       {state === "OK" ? (
//         <div className="bg-[#43A0471A] text-[#43A047] text-center font-medium h-[37px] flex items-center justify-center rounded-full">
//           Real
//         </div>
//       ) : (
//         <div className="bg-primary/10 text-primary text-center font-medium h-[37px] flex items-center justify-center rounded-full">
//           Spoof
//         </div>
//       )}

//       {/* Content */}
//       <div className="border mt-5 rounded-[20px] py-4 px-6">
//         <div className="mb-4">
//           <span className="text-[16px] text-black font-medium">
//             Attack Method:{" "}
//           </span>
//           <span className="text-[16px] text-gray-600">{attackMethod}</span>
//         </div>
//         <div className="mb-4">
//           <span className="text-[16px] text-black font-medium">
//             Liveness Probability:{" "}
//           </span>
//           <span className="text-[16px] text-gray-600">{livenessScore}</span>
//         </div>
//         {/* <div className="mb-4">
//           <span className="text-[16px] text-black font-medium">
//             Attack
//           </span>
//           <span className="text-[16px] text-gray-600">{livenessScore}</span>
//         </div>
//         <div className="mb-4">
//           <span className="text-[16px] text-black font-medium">
//             Quality Score:{" "}
//           </span>
//           <span className="text-[16px] text-gray-600">{qualityScore}</span>
//         </div>
//         <div>
//           <span className="text-[16px] text-black font-medium">State: </span>
//           <span className="text-[16px] text-gray-600">{state}</span>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default AttackCard;

import React from "react";

type AttackData = {
  attack_method: string;
  liveness_probability: number;
  liveness_score: number;
  quality_score: number;
  state: string;
};

type Props = {
  data: AttackData[];
};

const AttackCard: React.FC<Props> = ({ data }) => {
  // Extract attack methods and liveness probabilities
  const screenReplay = data.find(
    (item) => item.attack_method.trim() === "Screen Replay"
  );
  const printedCopy = data.find(
    (item) => item.attack_method.trim() === "Printed Copy"
  );
  const portraitSubstitution = data.find(
    (item) => item.attack_method.trim() === "Portrait Substitution"
  );

  // Check if document is Real or Fake
  const isReal =
    screenReplay!.liveness_probability > 0.5 &&
    printedCopy!.liveness_probability > 0.5 &&
    portraitSubstitution!.liveness_probability > 0.5;

  return (
    <div className="rounded-[20px] h-[600px] overflow-y-auto bg-white p-4 shadow-md">
      {/* Header */}
      {/* <div
        className={`text-center text-lg font-bold mb-6 ${
          isReal ? "text-green-600" : "text-red-600"
        }`}
      >
        {isReal ? "Real Document" : "Fake Document"}
      </div> */}
      {isReal ? (
        <div className="bg-[#43A0471A] text-[#43A047] text-center font-medium h-[37px] flex items-center justify-center rounded-full">
          Real
        </div>
      ) : (
        <div className="bg-primary/10 text-primary text-center font-medium h-[37px] flex items-center justify-center rounded-full">
          Spoof
        </div>
      )}

      {/* Liveness Scores */}
      <div className="border mt-5 rounded-[20px] py-4 px-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="text-[16px] text-black font-medium">
            Screen Replay Attack
          </span>
          <span>{screenReplay?.liveness_probability.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[16px] text-black font-medium">
            Printed Copy Attack
          </span>
          <span>{printedCopy?.liveness_probability.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[16px] text-black font-medium">
            Portrait Substitution Attack
          </span>
          <span>{portraitSubstitution?.liveness_probability.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
};

export default AttackCard;
