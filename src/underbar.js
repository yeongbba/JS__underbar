(function () {
  "use strict";

  window._ = {};

  // argument로 무엇이 전달되든간에, 있는 그대로 리턴하세요.
  // 이 함수가 쓸데없어 보일지 모르겠지만, 기억하세요! - 만약 함수에 iterator가 필요하고,
  // 뭐라도 넘겨줘야 하는 상황에는 이 함수가 유용할 것입니다.
  _.identity = function (val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * 이 섹션에서는 우리는 collection이라고 불리는 값들의 집합을 이용하는 함수에 집중할겁니다.
   * JavaScript에서는 collection은 값들을 포함하며, 배열 혹은 객체가 될 수 있습니다.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * .first 함수가 이미 구현되어 있습니다. 이 함수를 가이드 삼아, 앞으로 나올 함수들을 구현해보세요.
   * 사전에 이미 완료된 과제의 일부분을 만나게 될 경우, 반드시 코드를 잘 읽어보고 이해하고 넘어가십시오.
   * 이러한 과정을 지나친다면, 앞으로 구현하게 될 함수가 훨씬 더 어렵게 느껴질겁니다.
   */

  // 배열의 처음 n개의 element를 담은 배열을 리턴하세요.
  // 만일 n이 undefined일 경우, 단순히 첫번째 element를 리턴하세요.
  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // first와 비슷하게, 마지막 n개의 element를 담은 배열을 리턴하세요.
  // 만일 n이 undefined일 경우, 단순히 마지막 element를 리턴하세요.
  _.last = function (array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n === 0) {
      return [];
    } else {
      return array.slice(-n);
    }
  };

  // iterator(value, key, collection)를 collection의 각각의 key-value pair에 대해 호출하세요.
  // iterator는 함수로 전달되며, 쉽게 말해 반복해서 실행하는 함수입니다.
  // collection으로 배열과 객체를 다 받을 수 있어야 합니다.
  // 참고로 배열의 value는 element이며, key는 index입니다.
  //
  // Note: _.each 는 아무런 값도 리턴하지 않습니다.
  // 다만 단순히 iterator 함수를 전달되는 collection의 각 항목에 대해 실행할 뿐입니다.
  //
  // Note 2: 이 문제를 풀기 위해서는 여러분이 spec 디렉토리에 있는 테스트 케이스의 요구사항을 잘 살펴볼 필요가 있습니다.
  // 실제로 어떻게 사용되는지 각 테스트 케이스 항목에 잘 나와 있습니다.
  _.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (let prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }
  };

  // target으로 전달되는 값이 array에서 발견되면, 그 index를 리턴하세요.
  // 만일 array에서 발견할 수 없다면 -1을 리턴하세요.
  _.indexOf = function (array, target) {
    /**
     * TIP: 아래와 같이 `each`함수를 iteration 함수를 구현할 수 있습니다. 앞으로 우리가 구현할
     * iteration 함수에서도 `for` loop를 사용하는 대신, 우리가 작성한 `each` 함수를
     * 사용해서 iteration 함수를 구현해보세요.
     */
    let result = -1;

    _.each(array, function (item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // 테스트 함수를 통과하는 모든 element를 담은 배열을 리턴하세요.
  _.filter = function (collection, test) {
    let a = []; //빈 배열
    _.each(collection, function (item) {
      if (test(item)) {
        a.push(item);
      }
    });
    return a;
  };

  // 테스트 함수를 통과하지 않는 모든 element를 담은 배열을 리턴하세요.
  _.reject = function (collection, test) {
    /**
     * TIP: 위에서 구현한 `filter` 함수를 사용해서 `reject` 함수를 구현해보세요.
     */
    let arr = [];

    _.filter(collection, function (item) {
      if (!test(item)) {
        arr.push(item);
      }
    });
    return arr;
  };

  // element가 중복되지 않는 새로운 array를 만드세요.
  _.uniq = function (array) {
    let newArr = [];

    _.each(array, (item) => {
      let result = 0;
      for (let i = 0; i < array.length; i++) {
        if (item === array[i]) {
          result = result + 1;
        }
      }
      if (result === 1) {
        newArr.push(item);
      } else {
        if (_.indexOf(newArr, item) === -1) {
          newArr.push(item);
        }
      }
    });
    return newArr;
  };

  // iterator를 각 element에 적용한 결과를 담은 새로운 array를 리턴하세요.
  _.map = function (collection, iterator) {
    /**
     * `map` 함수는 다양한 경우에 사용할 수 있는 iteration function 입니다.
     * `each` 함수와 비슷하게 동작하지만, `each` 함수와는 다르게 배열에 iterator를
     * 실행한 결과들을 배열로 만들어 리턴합니다.
     */
    let newArr = [];

    _.each(collection, function (item) {
      newArr.push(iterator(item));
    });

    return newArr;
  };

  // 객체의 배열을 가져와서, 그 안에 있는 특정 속성의 값의 배열을 리턴하세요.
  // 예를 들어, people이라는 객체가 담긴 배열을 가져와서, 그들의 나이만 리턴할 수 있어야 합니다.
  _.pluck = function (collection, key) {
    /**
     * TIP: `map` 함수는 어떤 값들의 배열을 새로운 배열로 만들어줄 때 굉장히 유용합니다.
     * `pluck` 함수를 `map`을 사용해 구현해보세요.
     */
    return _.map(collection, function (item) {
      return item[key];
    });
  };

  // 각 항목에 대해 iterator(accumulator, item)를 반복적으로 호출하여, Reduces an array to a single value by repetitively calling
  // 하나의 값으로 줄입니다. accumulator는 누적값으로, 이전 iterator 호출의 반환값이어야 합니다.
  //
  // reduce에 대한 세번째 argument로 초기값을 전달 할 수 있습니다.
  // 만일 초기값이 전달되지 않으면, 첫번재 element가 accumulator로 사용되며, iterator에 전달되지 않습니다.
  // 즉, 초기값이 전달되지 않은 경우, iterator는 두번째 element로부터 시작합니다.
  //
  // 예제:
  //   const numbers = [1,2,3];
  //   const sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // 6이 리턴됩니다
  //
  //   const identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // 5가 리턴됩니다, 전달한 iterator와 관계없이, 첫번째 element가 즉시 사용됩니다.
  _.reduce = function (collection, iterator, accumulator) {
    let result;
    if (accumulator === undefined) {
      let acc = collection[0];
      for (let i = 1; i < collection.length; i++) {
        acc = iterator(acc, collection[i]);
      }
      result = acc;
    } else {
      let acc = accumulator;
      for (let i = 0; i < collection.length; i++) {
        acc = iterator(acc, collection[i]);
      }
      result = acc;
    }
    return result;
  };

  // 배열 또는 객체가 주어진 값을 포함하는지 체크합니다. (`===` 연산자를 사용해서 판단합니다.)
  _.contains = function (collection, target) {
    let result = false;

    _.each(collection, (item) => {
      if (item === target) {
        result = true;
      }
    });
    return result;
  };

  // 모든 element가 iterator에 의해 truthy한지 체크합니다.
  _.every = function (collection, iterator) {
    let arr = [];

    _.each(collection, (item) => {
      if (iterator === undefined) {
        if (item) {
          arr.push(true);
        } else {
          arr.push(false);
        }
      } else {
        if (iterator(item)) {
          arr.push(true);
        } else {
          arr.push(false);
        }
      }
    });

    if (_.contains(arr, false)) {
      return false;
    } else {
      return true;
    }
  };

  // element가 하나라도 iterator에 의해 truthy한지 체크합니다.
  // iterator가 없다면, element 그 자체가 truthy한지 체크하세요.
  _.some = function (collection, iterator) {
    let arr = [];

    _.each(collection, (item) => {
      if (iterator === undefined) {
        if (item) {
          arr.push(true);
        } else {
          arr.push(false);
        }
      } else {
        if (iterator(item)) {
          arr.push(true);
        } else {
          arr.push(false);
        }
      }
    });

    if (_.contains(arr, true)) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * OBJECTS
   * =======
   *
   * 이 섹션에서는, 객체를 서로 합쳐주는 몇개의 도우미 함수를 만들겁니다.
   */

  // 주어진 객체를 전달된 모든 속성으로 확장합니다.
  //
  // 예제:
  //   let obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1은 이제 다음 키를 포함합니다. key1, key2, key3, bla
  _.extend = function (obj, ...theArgs) {
    let result = obj;
    let objArr = theArgs;
    for (let i = 0; i < objArr.length; i++) {
      for (let key in objArr[i]) {
        result[key] = objArr[i][key];
      }
    }
    return result;
  };

  // extend와 비슷하지만, 이번엔 이미 존재하는 key에 대해 값을 덮어쓰기 하지 않습니다.
  _.defaults = function (obj, ...theArgs) {
    let result = obj;
    let objArr = theArgs;
    for (let i = 0; i < objArr.length; i++) {
      for (let key in objArr[i]) {
        if (!(key in obj)) {
          result[key] = objArr[i][key];
        }
      }
    }

    return result;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * 이번엔 함수 데코레이터(decorator)를 사용합니다. 함수 데코레이터는 쉽게 말해, 어떤 함수를 받아들이고
   * 다소 다르게 작동하는 새로운 버전의 함수를 리턴하는 함수를 의미합니다.
   */

  // 최대 한번만 호출할 수 있는 함수를 리턴합니다. 이후의 호출은 이전에 한번 리턴된 값만을 리턴해야 합니다.
  _.once = function (func) {
    // TIP: 아래 변수는 클로저 scope (바깥 함수 범위)에 저장되며, 리턴된 새로운 함수가 호출될 때마다,
    // 여전히 클로저 scope 내에 존재하므로, 리턴된 함수에서 사용할 수 있습니다.
    let alreadyCalled = true;
    let result;
    /**
     * TIP: `once` 함수는 새로운 함수를 리턴합니다. 이 함수는 이전에 한 번도 호출 된적이 없을 때만
     * input으로 받은 함수를 실행합니다.
     */
    return function (...theArgs) {
      if (alreadyCalled) {
        alreadyCalled = false;
        result = func(...theArgs);
      }
      // TIP: arguments 키워드 혹은, spread operator를 사용하세요.
      return result;
    };
  };

  // 주어진 시간 (밀리초) 동안 함수를 지연한 다음 제공된 argument로 함수를 호출합니다.
  //
  // 원래 함수에 대한 argument는 wait parameter 뒤에 전달됩니다.
  // 예를 들어, 다음을 호출할 경우
  // _.delay(someFunction, 500, 'a', 'b');
  // someFunction('a', 'b') 은 500ms 이후에 호출됩니다.
  _.delay = function (func, wait, ...theArgs) {
    let args = theArgs;

    let result = setTimeout(func, wait, ...args);

    return result;
  };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // 다차원 배열을 가져와서, 1차원 배열로 변환합니다.
  // 새 배열에는 다차원 배열의 모든 요소가 포함되어야 합니다.
  //
  // Hint: Array.isArray 를 사용해 배열인지 아닌지를 체크하세요.
  _.flatten = function (nestedArray, result) {
    const stack = nestedArray;
    const res = [];
    while (stack.length) {
      // pop value from stack
      const next = stack.pop();
      if (Array.isArray(next)) {
        // push back array items, won't modify the original input
        stack.push(...next);
      } else {
        res.push(next);
      }
    }
    // reverse to restore input order
    return res.reverse();

    //for array.length 만큼 순회
    // !isarray면 push
    // is array 면 길이도 몰라, 깊이도 몰라,
    // result = [];

    // _.each(nestedArray, (item) => {
    //   while (!Array.isArray(item)) {
    //
    //   }
    //   result.push(eval(arr));
    // });

    // console.log(result);

    // return result;
    //모든 요소가 배여링ㄴ지 확인
    //false = > result.push(nestedArray[indexof(false)])
    //
  };

  // 배열 내용의 순서를 랜덤하게 변경합니다.
  //
  // TIP: 이 함수는 immutable해야 합니다.
  _.shuffle = function (array) {
    let result = [];

    while (result.length !== array.length) {
      let element = array[getRandomInt(0, array.length)];
      if (_.indexOf(result, element) === -1) {
        result.push(element);
      }
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

    return result;
  };

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function (collection, functionOrKey, args) {
    let result = [];

    if (typeof functionOrKey === "function") {
      for (let i = 0; i < collection.length; i++) {
        let element = functionOrKey.call(collection[i]);
        result.push(element);
      }
    } else {
      for (let i = 0; i < collection.length; i++) {
        let element = `collection[i].${functionOrKey}()`;
        result.push(eval(element));
      }
    }
    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.

  _.sortBy = function (collection, iterator) {
    if (typeof iterator === "string") {
      collection.sort(function (a, b) {
        return a[iterator] - b[iterator];
      });
    } else {
      collection.sort(function (a, b) {
        return iterator(a) - iterator(b);
      });
    }
    return collection;
  };

  // _.sortBy = function (collection, iterator) {
  //   let array = collection;
  //   let result = [];
  //   let undef = [];
  //   let i = -1;

  //   while (array.length > 5) {
  //     i++;
  //     let nums = [];
  //     let a = iterator(array[i]);
  //     if (a === undefined) {
  //       undef.push(undefined);
  //       array.splice(i, 1);
  //       continue;
  //     }
  //     console.log(undef);
  //     for (let j = 0; j < array.length; j++) {
  //       let b = iterator(array[j]);
  //       let compareNums = a - b;

  //       if (b === undefined) {

  //       } else {
  //          nums.push(compareNums);
  //       }
  //     }
  //     let minNumsIndex = _.indexOf(nums, Math.max(...nums));
  //     console.log(minNumsIndex);
  //     result.push(array[minNumsIndex]);
  //     array.splice(minNumsIndex, 1);
  //     console.log(array);
  //   }

  //   if (array.length === 2) {
  //     if (iterator(array[0]) <= iterator(array[1])) {
  //       result.push(array[0]);
  //       result.push(array[1]);
  //     } else {
  //       result.push(array[1]);
  //       result.push(array[0]);
  //     }
  //   }
  //   console.log(result);

  //   return result;
  // };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function (...args) {
    let arrs = args;
    let arrLength = [];
    let result = [];

    for (let i = 0; i < arrs.length; i++) {
      let element = [];
      arrLength.push(arrs[i].length);
      for (let j = 0; j < Math.max(...arrLength); j++) {
        element.push(arrs[j][i]);
      }
      result.push(element);
    }
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function (...args) {
    let arrs = args;
    let length = [];
    let index;
    let result = [];

    for (let i = 0; i < arrs.length; i++) {
      length.push(arrs[i].length);
    }

    index = _.indexOf(length, Math.max(...length));

    for (let i = 0; i < arrs[index].length; i++) {
      let every = [];
      for (let j = 0; j < arrs.length; j++) {
        every.push(_.contains(arrs[j], arrs[index][i]));
      }
      if (_.every(every)) {
        result.push(arrs[index][i]);
      }
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array, ...args) {
    let firstArr = array;
    let arrs = args;
    let result = [];

    for (let i = 0; i < firstArr.length; i++) {
      let some = [];
      for (let j = 0; j < arrs.length; j++) {
        some.push(_.contains(arrs[j], firstArr[i]));
      }
      if (!_.some(some)) {
        result.push(firstArr[i]);
      }
    }
    return result;
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function (func) {
    var container = {};

    return function test() {
      if (container[JSON.stringify(arguments)] === undefined) {
        container[JSON.stringify(arguments)] = func.apply(null, arguments);
        return container[JSON.stringify(arguments)];
      } else {
        return container[JSON.stringify(arguments)];
      }
    };
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function (func, wait) {
    let flag = false;
    return function () {
      if (!flag) {
        func();
        flag = true;
        setTimeout(function () {
          flag = false;
        }, wait);
      }
    };
  };
})();
