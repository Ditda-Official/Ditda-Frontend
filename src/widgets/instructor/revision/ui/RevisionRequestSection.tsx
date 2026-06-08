const RevisionRequestSection = () => {
  return (
    <div className="rounded-12 w-235 bg-white p-6">
      <h1 className="text-heading1-sb text-gray-90 pb-2">
        수정 요청하기 <span className="text-gray-70">(</span>
        <span className="text-green-main">3</span>
        <span className="text-gray-70">/3)</span>
      </h1>
      <p className="text-gray-70 text-body2-m">시안 수정은 총 3회 수정이 가능합니다.</p>
    </div>
  );
};

export default RevisionRequestSection;
