enum ResultsEnum {
  M, P, T
}

const O1 = '110';
const O2 = '111';
const O3 = '011';
const O4 = '101';

const AllowedOptions = [O1, O2, O3, O4];

type TBase = Map<ResultsEnum, ((D: number, E: number, F: number) => void) | undefined>;
type TResults = Map<string, ((D: number, E: number, F: number) => void) | undefined>;

class CalculateServiceClass {
  private base: TBase = new Map([
    [ResultsEnum.M, (D: number, E: number, F: number) => D + (D * E / 10)],
    [ResultsEnum.P, (D: number, E: number, F: number) => D + (D * (E - F) / 25.5)],
    [ResultsEnum.T, (D: number, E: number, F: number) => D - (D * F / 30)],
  ]);
  private custom1base: TBase = new Map([
    [ResultsEnum.P, (D: number, E: number, F: number) => 2 * D + (D * E / 100)],
  ]);
  private custom2base: TBase = new Map([
    [ResultsEnum.M, (D: number, E: number, F: number) => F + D + (D * E / 100)],
  ]);
  private custom2results = (base: TBase): TResults => new Map([
    [O1, base.get(ResultsEnum.T)],
    [O4, base.get(ResultsEnum.M)],
  ]);

  private results = (base: TBase) => new Map([
    [O1, base.get(ResultsEnum.M)],
    [O2, base.get(ResultsEnum.P)],
    [O3, base.get(ResultsEnum.T)],
  ]);

  calculate = (option: string, custom1: boolean, custom2: boolean, D: number, E: number, F: number) => {
    if (!AllowedOptions.includes(option)) {
      return null;
    }

    let newBase: TBase = new Map([...this.base]);
    let newResults = this.results(newBase);
    if (custom1) {
      newBase = new Map([...newBase, ...this.custom1base]);
      newResults = this.results(newBase);
    }
    if (custom2) {
      newBase = new Map([...newBase, ...this.custom2base]);
      newResults = new Map([...this.results(newBase), ...this.custom2results(newBase)]);
    }

    const calc = newResults.get(option);

    if (calc) {
      return calc(D, E, F);
    }
    return null;
  }
}

const CalculateService = new CalculateServiceClass();

export default CalculateService;
