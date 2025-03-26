import React from "react";
import AttackCard from "./_components/attack-card";

type LivenessResult = {
  attack_method: string;
  liveness_probability: number;
  liveness_score: number;
  quality_score: number;
  state: string;
};

type IdDocumentLivenessType = {
  extractedData: LivenessResult[];
};

const IdDocumentLivenessResult: React.FC<IdDocumentLivenessType> = ({
  extractedData,
}) => {
  return (
    <div className="w-full h-[734px]  lg:px-4 py-6 rounded-t-[20px] bg-[#F5F8FF]">
      <h2 className="text-black text-[24px] font-medium mb-2">Result</h2>
      {extractedData.length > 0 ? (
        <div className="space-y-4 h-[700px] overflow-y-auto scrollBarThin">
          <AttackCard data={extractedData} />
          {/* {extractedData.map((result, index) => (
            <AttackCard
              key={index}
              attackMethod={result.attack_method}
              livenessProbability={result.liveness_probability}
              livenessScore={result.liveness_score}
              qualityScore={result.quality_score}
              state={result.state}
            />
          ))} */}
        </div>
      ) : (
        <div className="w-full h-[665px] flex items-center justify-center rounded-t-[20px] bg-white">
          <p className="text-[#5B5B5B] text-lg">No extracted data available.</p>
        </div>
      )}
    </div>
  );
};

export default IdDocumentLivenessResult;
