import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../shared/api.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent implements OnInit {
  @ViewChild('search') search: ElementRef | undefined;
  constructor(public api: ApiService, private _snackBar: MatSnackBar) {}

  isAdd: boolean = false;

  isUpdate: boolean = false;

  totalItems = 0;

  totalPages = 0;

  Searched = '';

  total: Number = 0;
  details = [
    {
      id: '',
      name: '',
      tamil: '0',
      english: '0',
      maths: '0',
      science: '0',
      social: '0',
      totalMark: 0,
    },
  ];
  pageIndex = 0;
  pageSize = 20;

  submit = (data: any, craeteForm: any) => {
    console.log(data.tamil);

    const total =
      Number(data.tamil) +
      Number(data.english) +
      Number(data.maths) +
      Number(data.science) +
      Number(data.social);
    this.api.postdata(JSON.stringify({ ...data, totalMark: total })).subscribe(
      (res: any) => {
        console.log(res);
        this.api
          .getData()

          .subscribe(
            (res: any) => {
              console.log(res);

              this.details = res;
              this.totalItems = this.details.length;
              this.totalPages = Math.ceil(this.totalItems / this.pageSize);

              let startIndex = this.pageIndex * this.pageSize;
              let endIndex = startIndex + this.pageSize;
              this.details = this.details.slice(startIndex, endIndex);
              console.log(this.details);

              if (this.sortclick) {
                this.Sort();
              }
              if (this.descclick) {
                this.desc();
              }
              if (this.Searched !== '') {
                this.Search(this.Searched);
              }
              this.openSnackBar(
                `${data.name}'s data created successfully`,
                'close'
              );
            },
            (err: any) => {
              console.error(err);
            }
          );
      },
      (err: any) => {
        console.error(err);
      }
    );

    console.log('executed');

    this.isAdd = false;

    craeteForm.resetForm();
  };

  ngOnInit(): void {
    console.log(this.search);
    console.log('executed');
    this.api
      .getData()

      .subscribe(
        (res: any) => {
          console.log(res);

          this.details = res;

          this.totalItems = this.details.length;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          let startIndex = this.pageIndex * this.pageSize;
          let endIndex = startIndex + this.pageSize;
          this.details = this.details.slice(startIndex, endIndex);
          console.log(this.details);

          if (this.sortclick) {
            this.Sort();
          }
          if (this.descclick) {
            this.desc();
          }
        },
        (err: any) => {
          console.error(err);
        }
      );
  }
  delname = '';

  deleted(id: any) {
    this.isUpdate = false;
    this.isAdd = false;
    console.log(id);
    this.api.deleteDataById(id).subscribe(
      (res) => {
        console.log(res);
        this.delname = res.name;

        this.api
          .getData()

          .subscribe(
            (res: any) => {
              console.log(res);

              this.details = res;
              this.totalItems = this.details.length;
              this.totalPages = Math.ceil(this.totalItems / this.pageSize);

              let startIndex = this.pageIndex * this.pageSize;
              let endIndex = startIndex + this.pageSize;
              this.details = this.details.slice(startIndex, endIndex);

              console.log(this.details);

              if (this.sortclick) {
                this.Sort();
              }

              if (this.descclick) {
                this.desc();
              }
              if (this.Searched !== '') {
                this.Search(this.Searched);
              }

              this.openSnackBar(
                `${this.delname}'s data deleted successfully`,
                'close'
              );

              const remainingItemsOnPage =
                this.totalItems - this.pageIndex * this.pageSize;
              console.log(remainingItemsOnPage);
              if (remainingItemsOnPage === 0) {
                this.backward();
              }
            },
            (err: any) => {
              console.error(err);
            }
          );
      },
      (err) => {
        console.error(err);
      }
    );
  }

  singleObjById = {
    id: '',
    name: '',
    tamil: '0',
    english: '0',
    maths: '0',
    science: '0',
    social: '0',
    totalMark: 0,
  };

  updated(detail: any) {
    this.isAdd = false;
    this.isUpdate = true;
    this.singleObjById = detail;
  }

  change(data: any, id: any) {
    console.log(data);
    const total =
      Number(data.tamil) +
      Number(data.english) +
      Number(data.maths) +
      Number(data.science) +
      Number(data.social);
    const newObj = { ...data, totalMark: total };
    console.log(newObj);
    this.api.updateData(id, JSON.stringify(newObj)).subscribe(
      (res) => {
        console.log(res);

        this.api
          .getData()

          .subscribe(
            (res: any) => {
              console.log(res);

              this.details = res;

              let startIndex = this.pageIndex * this.pageSize;
              let endIndex = startIndex + this.pageSize;
              this.details = this.details.slice(startIndex, endIndex);
              console.log(this.details);
              if (this.sortclick) {
                this.Sort();
              }
              if (this.descclick) {
                this.desc();
              }
              if (this.Searched !== '') {
                this.Search(this.Searched);
              }
              this.openSnackBar(
                `${newObj.name}'s data updated successfully`,
                'close'
              );
            },
            (err: any) => {
              console.error(err);
            }
          );
      },
      (err) => {
        console.error(err);
      }
    );

    this.isUpdate = false;
  }

  add() {
    this.isUpdate = false;
    this.isAdd = true;
  }
  out(forms: any) {
    this.isUpdate = false;
    this.isAdd = false;

    this.api
      .getData()

      .subscribe(
        (res: any) => {
          console.log(res);

          this.details = res;

          let startIndex = this.pageIndex * this.pageSize;
          let endIndex = startIndex + this.pageSize;
          this.details = this.details.slice(startIndex, endIndex);
          console.log(this.details);
        },
        (err: any) => {
          console.error(err);
        }
      );
    if (this.sortclick) {
      this.Sort();
    }
    if (this.descclick) {
      this.desc();
    }
    if (this.Searched !== '') {
      this.Search(this.Searched);
    }
    console.log(this.isAdd, this.isUpdate);
    forms.resetForm();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

  totalFun = (len = 1) => {
    this.api
      .getData()

      .subscribe(
        (res: any) => {
          console.log(res);

          this.totalItems = res.length;
          if (len == 0) {
            this.totalItems = 0;
          }

          console.log(res);
        },
        (err: any) => {
          console.error(err);
        }
      );
  };
  forward() {
    this.totalFun();

    console.log((this.pageIndex + 1) * this.pageSize, this.totalItems);
    if ((this.pageIndex + 1) * this.pageSize < this.totalItems) {
      this.pageIndex += 1;

      if (this.Searched) {
        this.Search(this.Searched);
      }
      this.api
        .getData()

        .subscribe(
          (res: any) => {
            console.log(res);

            this.details = res;
            this.totalItems = this.details.length;
            this.totalPages = Math.ceil(this.totalItems / this.pageSize);
            let startIndex = this.pageIndex * this.pageSize;
            let endIndex = startIndex + this.pageSize;
            this.details = this.details.slice(startIndex, endIndex);
            console.log(this.details);
          },
          (err: any) => {
            console.error(err);
          }
        );
    }
    if (this.sortclick) {
      this.Sort();
    }
    if (this.descclick) {
      this.desc();
    }

    if (this.Searched !== '') {
      this.Search(this.Searched);
    }
  }

  backward(len = 1) {
    this.totalFun(len);
    if (this.pageIndex > 0) {
      this.pageIndex -= 1;

      this.api
        .getData()

        .subscribe(
          (res: any) => {
            console.log(res);

            this.details = res;
            this.totalItems = this.details.length;
            console.log(len);
            //  if(len==0){
            //   this.totalItems=0

            //  }

            this.totalPages = Math.ceil(this.totalItems / this.pageSize);
            let startIndex = this.pageIndex * this.pageSize;
            let endIndex = startIndex + this.pageSize;
            this.details = this.details.slice(startIndex, endIndex);
            console.log(this.details);
          },
          (err: any) => {
            console.error(err);
          }
        );
    }
    if (this.sortclick) {
      this.Sort();
    }
    if (this.descclick) {
      this.desc();
    }
    if (this.Searched) {
      this.Search(this.Searched);
    }
  }
  sortclick = false;
  Sort() {
    this.descclick = false;
    this.sortclick = true;

    this.api
      .getData()

      .subscribe(
        (res: any) => {
          console.log(res);
          this.details = res;
          if (this.Searched) {
            const regex = new RegExp(this.Searched, 'i');
            this.details = res.filter((obj: any) => regex.test(obj.name));
          }

          this.details = this.details.sort((a: any, b: any) => {
            const nameA = a.name.toUpperCase(); // Ignore case
            const nameB = b.name.toUpperCase(); // Ignore case
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0; // names must be equal
          });

          console.log(this.details);

          let startIndex = this.pageIndex * this.pageSize;
          let endIndex = startIndex + this.pageSize;
          this.details = this.details.slice(startIndex, endIndex);
          console.log(this.details);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }
  descclick = false;
  desc() {
    this.sortclick = false;
    this.descclick = true;
    this.api
      .getData()

      .subscribe(
        (res: any) => {
          console.log(res);
          this.details = res;
          if (this.Searched) {
            const regex = new RegExp(this.Searched, 'i');
            this.details = res.filter((obj: any) => regex.test(obj.name));
          }

          this.details = this.details.sort((a: any, b: any) => {
            const nameA = a.name.toUpperCase(); // Ignore case
            const nameB = b.name.toUpperCase(); // Ignore case
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
            return 0; // names must be equal
          });

          console.log(this.details);

          let startIndex = this.pageIndex * this.pageSize;
          let endIndex = startIndex + this.pageSize;
          this.details = this.details.slice(startIndex, endIndex);
          console.log(this.details);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  Search(search: any) {
    this.Searched = search;
    this.searched = false;
    if (this.Searched == '') {
      this.searched = true;
    }

    this.api
      .getData()

      .subscribe(
        (res: any) => {
          console.log(res);

          console.log(search);
          const regex = new RegExp(this.Searched, 'i');
          this.details = res.filter((obj: any) => regex.test(obj.name));

          if (this.details.length === 0) {
            this.Searched = '';
          }

          if (this.sortclick) {
            this.details = this.details.sort((a: any, b: any) => {
              const nameA = a.name.toUpperCase(); // Ignore case
              const nameB = b.name.toUpperCase(); // Ignore case
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0; // names must be equal
            });
          }
          //next do

          if (this.descclick) {
            this.details = this.details.sort((a: any, b: any) => {
              const nameA = a.name.toUpperCase(); // Ignore case
              const nameB = b.name.toUpperCase(); // Ignore case
              if (nameA > nameB) {
                return -1;
              }
              if (nameA < nameB) {
                return 1;
              }
              return 0; // names must be equal
            });
          }
          //console.log(this.details)

          this.totalItems = this.details.length;
          // console.log(this.totalItems)
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          //console.log(this.totalPages,'  ',this.pageIndex+1)
          if (this.totalPages < this.pageIndex + 1) {
            this.backward(this.details.length);
          }

          // console.log(this.totalPages,'  ',this.pageIndex+1)
          let startIndex = this.pageIndex * this.pageSize;
          let endIndex = startIndex + this.pageSize;
          this.details = this.details.slice(startIndex, endIndex);
          // console.log(this.details)
        },
        (err: any) => {
          //console.error(err)
        }
      );
    // if(this.sortclick){
    //   this.Sort()
    // }
    // if(this.descclick){
    //   this.desc()
    // }
  }
  val = '';

  searched = false;

  clean() {
    this.searched = true;

    this.val = '';
    this.Searched = '';
    console.log(this.val, ' ', 'clean');

    this.ngOnInit();
  }
  unorder() {
    this.sortclick = false;
    this.descclick = false;

    if (this.Searched != '') {
      this.Search(this.Searched);
    } else {
      this.ngOnInit();
    }
  }
}
