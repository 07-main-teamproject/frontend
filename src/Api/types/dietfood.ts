export interface AddFoodRequest {
  external_ids: string[];
  portion_size: number;
  merge_quantity: boolean;
}

/**
   * {
      "external_ids": ["5025125000112"],     -> 여러 개 가능
      "portion_size":  200 ,
      "merge_quantity": true     -> 음식이 이미 존재하면 양만 수정 (true면 기존 양에 더함, false면 덮어씌움)
  }
  
  음식 단일 추가 및 대량 추가 (영양소 업데이트 포함)
   */

export interface AddedFood {
  external_id: string;
  portion_size: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface AddFoodResponse {
  detail: string;
  added_foods: AddedFood[];
}

/**
   * {
      "detail": "음식이 추가되었습니다.",
      "added_foods": [
          {
              "external_id": "5025125000112",
              "portion_size": 400.0,
              "calories": 947.2,
              "protein": 38.912,
              "carbs": 184.064,
              "fat": 2.7904
          }
      ]
  }
   */

export interface PortionSize {
  external_ids: string[];
  portion_size: number;
}

/**
   * api/dietfood/protionsize/{diet_id}/
   * {
      "external_ids": ["5057967395132" ,"5010092093441"],    -> 같은 양을 여러 음식에 적용 할때
      "portion_size": 150
  }
   */

export interface UpdateAllPortionSizeRequest {
  updates: PortionSize[];
}

/**
   * {
      "updates": [                                                             -> 개별적으로 다른 양을 적용 할때
          {
              "external_id": "5057967395132",
              "portion_size": 200
          },
          {
              "external_id": "5010092093441",
              "portion_size": 120
          }
      ]
  }
   */

export interface UpdatePortionSizeResponse {
  detail: string;
  updated_foods: PortionSize[];
}
/**
   * {
      "detail": "음식의 양이 업데이트되었습니다.",
      "updated_foods": [
          {
              "external_id": "5057967395132",
              "portion_size": 150
          },
          {
              "external_id": "5010092093441",
              "portion_size": 150
          }
      ]
  }
   */
