import React from "react";
import Card from "./Card";

function LatestCollection() {
  return (
    <>
      <div className="px-11 max-lg:px-2 ">
        <div className="max-lg:overflow-x-scroll flex items-center gap-4">
          <Card additionalClass="!w-full !min-h-[400px] max-lg:!min-h-[240px] !bg- !p-0 max-lg:!w-[300px] max-lg:!flex-shrink-0">
            <div></div>
          </Card>
          <Card additionalClass="!w-full !min-h-[400px] max-lg:!min-h-[240px] !bg- !p-0 max-lg:!w-[300px] max-lg:!flex-shrink-0">
            <div></div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default LatestCollection;
