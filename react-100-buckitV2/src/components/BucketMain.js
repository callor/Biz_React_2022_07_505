import { useState } from "react";
import uuid from "react-uuid";
import moment from "moment";
import BucketList from "./BucketList";

/*
component 의 본문 만들기
함수를 선언하고
함수에서 컴포넌트 코드를 return 한다
이때 return 내의 컴포넌트 tag 의 가장 바깥을 감싸서
한개의 tag 로 묶어야 한다
*/
const BucketMain = () => {
  /*
   buckList state 변수를 배열로 선언하기
   state 변수를  배열로 선언하여 사용할 경우
   표준 JS 코드에 있는 배열에 요소를 추가하는 함수를 사용할수 없다
   state 배열에 요소를 추가하는 경우는 setter 함수를 사용하는데
   이 함수가 작동되는 방식은
   기존의 배열을 새로운 배열로 복사하고, 요소를 추가한 후
   새로운 배열과 기존의 배열을 교환하는 방식으로 이루어진다

   */
  const [bucketList, setBucketList] = useState([]);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      const bucket = {
        b_id: uuid(), // uuid 를 사용하여 Bucket PK 생성
        b_flag: 0, // 중요도를 표시하는 데이터로 사용
        b_start_date: moment().format("YYYY[-]MM[-]DD HH:mm:ss"),
        b_bucket: e.target.value,
        b_end_date: "",
      };
      setBucketList([...bucketList, bucket]);
      console.table(bucketList);
    }
  }; // end onKeyDown

  const bucket_delete = (id) => {
    const bucketRemoveList = bucketList.filter((bucket) => {
      return bucket.b_id !== id;
    });
    setBucketList(bucketRemoveList);
  }; // end bucket_delete

  // 중요도 칼럼을 클릭했을때
  // 중요도 항목을 변경시킬수 있도록 b_flag 변수값을 변경하는 함수
  const bucket_flag_toggle = (id) => {
    // map(forEach)을 사용하여 전체 리스트를 반복하면서
    // id 가 일치하는 항목을 찾아 flag 값을 변경할 것이다
    const bucketBody = bucketList.map((bucket) => {
      if (bucket.b_id === id) {
        // 원래의 bucket 데이터를 spread(펼치기) 하고
        // b_flag 값만 원의 b_flag 값에 1을 덧셈하여 변경하고
        // 새로운 _temp_bucket 에 복제하라
        const _temp_bucket = { ...bucket, b_flag: bucket.b_flag + 1 };
        // 복제한 _temp_bucket 을 return 하여
        // bucketBody 를 다시 작성한다
        return _temp_bucket;
      }

      // id 가 일치하지 않는 데이터는 변경하지 말고 원래 데이터를 return
      return bucket;
    }); // end map
    // 새로 생성된 bucketBody 로 기존 bucketList 배열을 교체
    setBucketList(bucketBody);
  }; // end bucket_flag_toggle

  const bucket_complet = (id) => {
    const bucketBody = bucketList.map((bucket) => {
      if (bucket.b_id === id) {
        const e_date = moment().format("YYYY[-]MM[-]DD HH:mm:ss");
        return { ...bucket, b_end_date: e_date };
      }
      return bucket;
    });
    setBucketList(bucketBody);
  };

  /*
  const functions = {
    bucket_delete: bucket_delete,
    bucket_flag_toggle: bucket_flag_toggle,
    bucket_complet: bucket_complet,
  };
  */
  // JSON 의 속성변수 이름과 값(함수)이 일치 할때는
  // 변수명만으로 JSON 객체를 선언하면 위의 코드와 같이 생성한다
  const functions = {
    bucket_delete,
    bucket_flag_toggle,
    bucket_complet,
  };

  return (
    <>
      <div>
        <input
          onKeyDown={onKeyDown}
          placeholder="버킷에 추가할 내용을 입력하세요"
          className="w3-input w3-border w3-hover-gray w3-round"
        />
      </div>
      <div>
        <BucketList bucketList={bucketList} functions={functions} />
      </div>
    </>
  );
};

export default BucketMain;
