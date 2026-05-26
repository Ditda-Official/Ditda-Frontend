import FileDragAndDrop from "@/components/common/FileDragAndDrop";
import FileUpload from "@/components/common/FileUpload";
import TextField from "@/components/input/TextField";

const AttachFileSection = () => {
  return (
    <div className="rounded-12 focus-within:border-purple-40 flex flex-col border border-transparent bg-white p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-90 text-heading1-sb">자료 첨부</h1>
            <h2 className="text-gray-70 text-body2-m">
              교재 속에 들어갈 이미지 및 자료를 첨부해주세요
            </h2>
          </div>
          <FileDragAndDrop />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-70 text-body1-sb">첨부 자료 참고사항</p>
          <TextField placeholder="ex) img.04는 강사 프로필에 들어가는 이미지입니다." />
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default AttachFileSection;
