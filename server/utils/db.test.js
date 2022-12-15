import DBUtil from "./db";

describe('DBUtil', () => {
  it('Should return null when given value is undefined', () => {
    const value = DBUtil.processDbBindParamValue();
    expect(value).toBe(null);
  });

  it('Should trim given string value', () => {
    let value;

    value = DBUtil.processDbBindParamValue(' ');
    expect(value).toBe('');

    value = DBUtil.processDbBindParamValue(' test ');
    expect(value).toBe('test');
  });

  it('Should respect given non-undefined value', () => {
    let value;

    value = DBUtil.processDbBindParamValue(0);
    expect(value).toBe(0);

    value = DBUtil.processDbBindParamValue(false);
    expect(value).toBe(false);

    value = DBUtil.processDbBindParamValue(null);
    expect(value).toBe(null);

    value = DBUtil.processDbBindParamValue('test');
    expect(value).toBe('test');
  });
});
