import Controller from './../Controller';

describe('тесты контроллера', () => {
  class ModelMoc {
    constructor() {

    }
  }

  class ViewMoc {
    constructor() { }
    on() { };
  }

  const model = new ModelMoc();
  const view = new ViewMoc();
  const controller = new Controller(model, view);

  it('создание контроллера и подключение view', () => {
    expect('veiw' in controller).not.toBe(undefined)
  });

  const mockFn1 = jest.fn((...a) => { return a + '!' });
  const mockFn2 = jest.fn((a) => { return a[0] });
  const scenario = [
    controller.addInstruction(mockFn1, 'ok1'),
    { fn: mockFn2, args: ['ok2'] },
  ];

  it('при добавление в скрипт функция не вызывается', () => {
    expect(mockFn1.mock.calls.length).toBe(0);
  });

  controller.addScript('scenario1', scenario);

  it('добавление сценария', () => {
    expect('scenario1' in controller.scripts).toBe(true);
    expect(controller.scripts['scenario1'].length).toBe(2);
  });

  it('выполнение инструкции', () => {
    expect(controller.scripts['scenario1'][0].fn(controller.scripts['scenario1'][0].args)).toBe('ok1!');
    expect(controller.scripts['scenario1'][1].fn(controller.scripts['scenario1'][1].args)).toBe('ok2');
    expect(mockFn2.mock.calls.length).toBe(1);
    expect(mockFn1.mock.calls.length).toBe(1);
  });

  it('выполнение скрипта', () => {
    controller.runScript(scenario);
    expect(mockFn2.mock.calls.length).toBe(2);
    expect(mockFn1.mock.calls.length).toBe(2);
    expect(mockFn1.mock.results[1].value).toBe('ok1!');
    expect(mockFn2.mock.results[1].value).toBe('ok2');
  });

});