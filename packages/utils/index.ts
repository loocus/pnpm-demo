console.log('utils')
class A {
  static a: string
}

console.log(A.a)

namespace B {
  export function test() {
    return 'a'
  }
}

console.log(B.test)

export default B