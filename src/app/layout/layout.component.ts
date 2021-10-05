import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ColorEvent } from "ngx-color";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  colorForm: FormGroup;
  defaultColor: string = "#f44336";

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.colorForm = this.fb.group({
      colorBackground: this.fb.control('', [Validators.required]),
      colorFont: this.fb.control('', [Validators.required]),
    }, {validator: fooColors});
  }

  setColorBackground(event: ColorEvent): void {
    let hex = event.color.hex;
    let currentColorFont = this.colorForm.controls["colorFont"].value;

    this.colorForm.controls["colorBackground"].setValue(event.color.hex);

    if (hex == currentColorFont) {
      this.toastr.error(
        "El color de fondo escogido es igual al color de fuente"
      );
    }
  }

  setColorFont(event: ColorEvent): void {
    let hex = event.color.hex;
    let currentColorBackground =
      this.colorForm.controls["colorBackground"].value;

    this.colorForm.controls["colorFont"].setValue(event.color.hex);

    if (hex == currentColorBackground) {
      this.toastr.error(
        "El color de fuente escogido es igual al color de fondo"
      );
    }
  }

  onSubmit(): void {
    let value = this.colorForm.value;
    this.toastr.success(
      `Color de fondo: ${value.colorBackground}, Color de fuente: ${value.colorFont}`
    );
  }

  resetForm(): void {
    this.colorForm.reset();
  }
}

const fooColors: ValidatorFn = (fg: FormGroup) => {
  const background = fg.get('colorBackground').value;
  const font = fg.get('colorFont').value;

  return (background == font) ? { equal: true } : null;
}
