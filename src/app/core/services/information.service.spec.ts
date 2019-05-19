import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationService } from './information.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Info } from 'src/app/shared/models/info';



describe('InformationService', () => {
  let Infoservice: InformationService;
  let arrInfo: Info[];
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [InformationService]
    });

    Infoservice = TestBed.get(InformationService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return the inserted data', () => {
    //Mock data to be sent as request payload
    const info: Info = {
      nome: 'Testing',
      sobreNome: 'Spec',
      participacao: 50
    };
    //Verify if the sevice returns data
    Infoservice.persistInfo(info)
      .subscribe(data => {
        expect(data).toBeTruthy();
      });

    const req = httpTestingController.expectOne('http://localhost:3000/insertInfo');

    //Verify if we're actually making a 'POST' request
    expect(req.request.method).toEqual('POST');

    req.flush(info);
  });

  it('should return and Observable<array<Info>>', () => {
    let datas;
    Infoservice.getInfo().subscribe((data) => {
      expect(data).toEqual(arrInfo);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/getInfo');
  });


  it('should be created', () => {
    const service: InformationService = TestBed.get(InformationService);
    expect(service).toBeTruthy();
  });
});
