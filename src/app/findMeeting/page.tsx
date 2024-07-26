"use client"

import { useState } from "react"

import FilterCalendar from "@/components/pages/findMeeting/FilterCalendar/FilterCalendar"
import FilterSort from "@/components/pages/findMeeting/FilterSort/FilterSort"
import FilterTab from "@/components/pages/findMeeting/FilterTab/FilterTab"
import Filter from "@/components/public/Filter/Filter"
import Button from "@/components/public/button/Button"
import { location } from "@/constants/meeting"

const FindMeeting = () => {
  const [filterOption, setFilterOption] = useState({
    type: "DALLAEMFIT",
    location: "",
    date: "",
    createdBy: "",
    sortBy: "registrationEnd",
    sortOrder: "",
  })

  // TODO: 이벤트를 넘기지 않고 수정할 값만 파싱해서 넘기도록 수정 필요(역할, 책임 등의 문제)
  const onFilterChanged = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement> | string,
    key: string,
  ) => {
    if (key) {
      // 1. date 등 문자열 값을 넘기는 경우
      if (typeof e === "string") setFilterOption({ ...filterOption, [key]: e })
      // 2. 이벤트 객체를 넘기는 경우
      else {
        const target = e.target as HTMLButtonElement
        if (target.value) setFilterOption({ ...filterOption, [key]: target.value })
        // 3. 버튼 내의 svg 클릭 하는 경우 (value가 존재하지 않는 문제 때문에 추가, 부모요소의 value를 가져오도록)
        else if (target.parentElement && target.parentElement.tagName.toLowerCase() === "button") {
          const targetParent = target.parentElement as HTMLButtonElement
          if (targetParent.value) setFilterOption({ ...filterOption, [key]: targetParent.value })
        }
      }
    }
  }

  return (
    <div className="flex flex-col bg-gray-50 px-[102px] py-[40px]">
      <div className="flex justify-between">
        <FilterTab
          selVal={filterOption.type}
          onSelect={(e) => {
            onFilterChanged(e, "type")
          }}
        />
        <div>
          <Button borderStyle="solid" onClick={() => {}}>
            모임 만들기
          </Button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Filter
            data={location}
            placeholder="지역 선택"
            onSelect={(e) => {
              onFilterChanged(e, "location")
            }}
            selVal={filterOption.location}
          />
          <FilterCalendar
            placeholder="날짜 선택"
            selVal={filterOption.date}
            onChange={(e) => {
              onFilterChanged(e, "date")
            }}
          />
        </div>
        <FilterSort
          onSelect={(e) => {
            onFilterChanged(e, "sortBy")
          }}
          selVal={filterOption.sortBy}
        />
      </div>
    </div>
  )
}
export default FindMeeting
