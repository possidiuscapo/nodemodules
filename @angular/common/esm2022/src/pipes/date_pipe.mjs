/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, InjectionToken, LOCALE_ID, Optional, Pipe } from '@angular/core';
import { formatDate } from '../i18n/format_date';
import { DEFAULT_DATE_FORMAT } from './date_pipe_config';
import { invalidPipeArgumentError } from './invalid_pipe_argument_error';
import * as i0 from "@angular/core";
/**
 * Optionally-provided default timezone to use for all instances of `DatePipe` (such as `'+0430'`).
 * If the value isn't provided, the `DatePipe` will use the end-user's local system timezone.
 *
 * @deprecated use DATE_PIPE_DEFAULT_OPTIONS token to configure DatePipe
 */
export const DATE_PIPE_DEFAULT_TIMEZONE = new InjectionToken('DATE_PIPE_DEFAULT_TIMEZONE');
/**
 * DI token that allows to provide default configuration for the `DatePipe` instances in an
 * application. The value is an object which can include the following fields:
 * - `dateFormat`: configures the default date format. If not provided, the `DatePipe`
 * will use the 'mediumDate' as a value.
 * - `timezone`: configures the default timezone. If not provided, the `DatePipe` will
 * use the end-user's local system timezone.
 *
 * @see {@link DatePipeConfig}
 *
 * @usageNotes
 *
 * Various date pipe default values can be overwritten by providing this token with
 * the value that has this interface.
 *
 * For example:
 *
 * Override the default date format by providing a value using the token:
 * ```typescript
 * providers: [
 *   {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'shortDate'}}
 * ]
 * ```
 *
 * Override the default timezone by providing a value using the token:
 * ```typescript
 * providers: [
 *   {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {timezone: '-1200'}}
 * ]
 * ```
 */
export const DATE_PIPE_DEFAULT_OPTIONS = new InjectionToken('DATE_PIPE_DEFAULT_OPTIONS');
// clang-format off
/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a date value according to locale rules.
 *
 * `DatePipe` is executed only when it detects a pure change to the input value.
 * A pure change is either a change to a primitive input value
 * (such as `String`, `Number`, `Boolean`, or `Symbol`),
 * or a changed object reference (such as `Date`, `Array`, `Function`, or `Object`).
 *
 * Note that mutating a `Date` object does not cause the pipe to be rendered again.
 * To ensure that the pipe is executed, you must create a new `Date` object.
 *
 * Only the `en-US` locale data comes with Angular. To localize dates
 * in another language, you must import the corresponding locale data.
 * See the [I18n guide](guide/i18n-common-format-data-locale) for more information.
 *
 * The time zone of the formatted value can be specified either by passing it in as the second
 * parameter of the pipe, or by setting the default through the `DATE_PIPE_DEFAULT_OPTIONS`
 * injection token. The value that is passed in as the second parameter takes precedence over
 * the one defined using the injection token.
 *
 * @see {@link formatDate}
 *
 *
 * @usageNotes
 *
 * The result of this pipe is not reevaluated when the input is mutated. To avoid the need to
 * reformat the date on every change-detection cycle, treat the date as an immutable object
 * and change the reference when the pipe needs to run again.
 *
 * ### Pre-defined format options
 *
 * | Option        | Equivalent to                       | Examples (given in `en-US` locale)              |
 * |---------------|-------------------------------------|-------------------------------------------------|
 * | `'short'`     | `'M/d/yy, h:mm a'`                  | `6/15/15, 9:03 AM`                              |
 * | `'medium'`    | `'MMM d, y, h:mm:ss a'`             | `Jun 15, 2015, 9:03:01 AM`                      |
 * | `'long'`      | `'MMMM d, y, h:mm:ss a z'`          | `June 15, 2015 at 9:03:01 AM GMT+1`             |
 * | `'full'`      | `'EEEE, MMMM d, y, h:mm:ss a zzzz'` | `Monday, June 15, 2015 at 9:03:01 AM GMT+01:00` |
 * | `'shortDate'` | `'M/d/yy'`                          | `6/15/15`                                       |
 * | `'mediumDate'`| `'MMM d, y'`                        | `Jun 15, 2015`                                  |
 * | `'longDate'`  | `'MMMM d, y'`                       | `June 15, 2015`                                 |
 * | `'fullDate'`  | `'EEEE, MMMM d, y'`                 | `Monday, June 15, 2015`                         |
 * | `'shortTime'` | `'h:mm a'`                          | `9:03 AM`                                       |
 * | `'mediumTime'`| `'h:mm:ss a'`                       | `9:03:01 AM`                                    |
 * | `'longTime'`  | `'h:mm:ss a z'`                     | `9:03:01 AM GMT+1`                              |
 * | `'fullTime'`  | `'h:mm:ss a zzzz'`                  | `9:03:01 AM GMT+01:00`                          |
 *
 * ### Custom format options
 *
 * You can construct a format string using symbols to specify the components
 * of a date-time value, as described in the following table.
 * Format details depend on the locale.
 * Fields marked with (*) are only available in the extra data set for the given locale.
 *
 *  | Field type          | Format      | Description                                                   | Example Value                                              |
 *  |-------------------- |-------------|---------------------------------------------------------------|------------------------------------------------------------|
 *  | Era                 | G, GG & GGG | Abbreviated                                                   | AD                                                         |
 *  |                     | GGGG        | Wide                                                          | Anno Domini                                                |
 *  |                     | GGGGG       | Narrow                                                        | A                                                          |
 *  | Year                | y           | Numeric: minimum digits                                       | 2, 20, 201, 2017, 20173                                    |
 *  |                     | yy          | Numeric: 2 digits + zero padded                               | 02, 20, 01, 17, 73                                         |
 *  |                     | yyy         | Numeric: 3 digits + zero padded                               | 002, 020, 201, 2017, 20173                                 |
 *  |                     | yyyy        | Numeric: 4 digits or more + zero padded                       | 0002, 0020, 0201, 2017, 20173                              |
 *  | Week-numbering year | Y           | Numeric: minimum digits                                       | 2, 20, 201, 2017, 20173                                    |
 *  |                     | YY          | Numeric: 2 digits + zero padded                               | 02, 20, 01, 17, 73                                         |
 *  |                     | YYY         | Numeric: 3 digits + zero padded                               | 002, 020, 201, 2017, 20173                                 |
 *  |                     | YYYY        | Numeric: 4 digits or more + zero padded                       | 0002, 0020, 0201, 2017, 20173                              |
 *  | Month               | M           | Numeric: 1 digit                                              | 9, 12                                                      |
 *  |                     | MM          | Numeric: 2 digits + zero padded                               | 09, 12                                                     |
 *  |                     | MMM         | Abbreviated                                                   | Sep                                                        |
 *  |                     | MMMM        | Wide                                                          | September                                                  |
 *  |                     | MMMMM       | Narrow                                                        | S                                                          |
 *  | Month standalone    | L           | Numeric: 1 digit                                              | 9, 12                                                      |
 *  |                     | LL          | Numeric: 2 digits + zero padded                               | 09, 12                                                     |
 *  |                     | LLL         | Abbreviated                                                   | Sep                                                        |
 *  |                     | LLLL        | Wide                                                          | September                                                  |
 *  |                     | LLLLL       | Narrow                                                        | S                                                          |
 *  | Week of year        | w           | Numeric: minimum digits                                       | 1... 53                                                    |
 *  |                     | ww          | Numeric: 2 digits + zero padded                               | 01... 53                                                   |
 *  | Week of month       | W           | Numeric: 1 digit                                              | 1... 5                                                     |
 *  | Day of month        | d           | Numeric: minimum digits                                       | 1                                                          |
 *  |                     | dd          | Numeric: 2 digits + zero padded                               | 01                                                         |
 *  | Week day            | E, EE & EEE | Abbreviated                                                   | Tue                                                        |
 *  |                     | EEEE        | Wide                                                          | Tuesday                                                    |
 *  |                     | EEEEE       | Narrow                                                        | T                                                          |
 *  |                     | EEEEEE      | Short                                                         | Tu                                                         |
 *  | Week day standalone | c, cc       | Numeric: 1 digit                                              | 2                                                          |
 *  |                     | ccc         | Abbreviated                                                   | Tue                                                        |
 *  |                     | cccc        | Wide                                                          | Tuesday                                                    |
 *  |                     | ccccc       | Narrow                                                        | T                                                          |
 *  |                     | cccccc      | Short                                                         | Tu                                                         |
 *  | Period              | a, aa & aaa | Abbreviated                                                   | am/pm or AM/PM                                             |
 *  |                     | aaaa        | Wide (fallback to `a` when missing)                           | ante meridiem/post meridiem                                |
 *  |                     | aaaaa       | Narrow                                                        | a/p                                                        |
 *  | Period*             | B, BB & BBB | Abbreviated                                                   | mid.                                                       |
 *  |                     | BBBB        | Wide                                                          | am, pm, midnight, noon, morning, afternoon, evening, night |
 *  |                     | BBBBB       | Narrow                                                        | md                                                         |
 *  | Period standalone*  | b, bb & bbb | Abbreviated                                                   | mid.                                                       |
 *  |                     | bbbb        | Wide                                                          | am, pm, midnight, noon, morning, afternoon, evening, night |
 *  |                     | bbbbb       | Narrow                                                        | md                                                         |
 *  | Hour 1-12           | h           | Numeric: minimum digits                                       | 1, 12                                                      |
 *  |                     | hh          | Numeric: 2 digits + zero padded                               | 01, 12                                                     |
 *  | Hour 0-23           | H           | Numeric: minimum digits                                       | 0, 23                                                      |
 *  |                     | HH          | Numeric: 2 digits + zero padded                               | 00, 23                                                     |
 *  | Minute              | m           | Numeric: minimum digits                                       | 8, 59                                                      |
 *  |                     | mm          | Numeric: 2 digits + zero padded                               | 08, 59                                                     |
 *  | Second              | s           | Numeric: minimum digits                                       | 0... 59                                                    |
 *  |                     | ss          | Numeric: 2 digits + zero padded                               | 00... 59                                                   |
 *  | Fractional seconds  | S           | Numeric: 1 digit                                              | 0... 9                                                     |
 *  |                     | SS          | Numeric: 2 digits + zero padded                               | 00... 99                                                   |
 *  |                     | SSS         | Numeric: 3 digits + zero padded (= milliseconds)              | 000... 999                                                 |
 *  | Zone                | z, zz & zzz | Short specific non location format (fallback to O)            | GMT-8                                                      |
 *  |                     | zzzz        | Long specific non location format (fallback to OOOO)          | GMT-08:00                                                  |
 *  |                     | Z, ZZ & ZZZ | ISO8601 basic format                                          | -0800                                                      |
 *  |                     | ZZZZ        | Long localized GMT format                                     | GMT-8:00                                                   |
 *  |                     | ZZZZZ       | ISO8601 extended format + Z indicator for offset 0 (= XXXXX)  | -08:00                                                     |
 *  |                     | O, OO & OOO | Short localized GMT format                                    | GMT-8                                                      |
 *  |                     | OOOO        | Long localized GMT format                                     | GMT-08:00                                                  |
 *
 *
 * ### Format examples
 *
 * These examples transform a date into various formats,
 * assuming that `dateObj` is a JavaScript `Date` object for
 * year: 2015, month: 6, day: 15, hour: 21, minute: 43, second: 11,
 * given in the local time for the `en-US` locale.
 *
 * ```
 * {{ dateObj | date }}               // output is 'Jun 15, 2015'
 * {{ dateObj | date:'medium' }}      // output is 'Jun 15, 2015, 9:43:11 PM'
 * {{ dateObj | date:'shortTime' }}   // output is '9:43 PM'
 * {{ dateObj | date:'mm:ss' }}       // output is '43:11'
 * ```
 *
 * ### Usage example
 *
 * The following component uses a date pipe to display the current date in different formats.
 *
 * ```
 * @Component({
 *  selector: 'date-pipe',
 *  template: `<div>
 *    <p>Today is {{today | date}}</p>
 *    <p>Or if you prefer, {{today | date:'fullDate'}}</p>
 *    <p>The time is {{today | date:'h:mm a z'}}</p>
 *  </div>`
 * })
 * // Get the current date and time as a date-time value.
 * export class DatePipeComponent {
 *   today: number = Date.now();
 * }
 * ```
 *
 * @publicApi
 */
// clang-format on
export class DatePipe {
    constructor(locale, defaultTimezone, defaultOptions) {
        this.locale = locale;
        this.defaultTimezone = defaultTimezone;
        this.defaultOptions = defaultOptions;
    }
    transform(value, format, timezone, locale) {
        if (value == null || value === '' || value !== value)
            return null;
        try {
            const _format = format ?? this.defaultOptions?.dateFormat ?? DEFAULT_DATE_FORMAT;
            const _timezone = timezone ?? this.defaultOptions?.timezone ?? this.defaultTimezone ?? undefined;
            return formatDate(value, _format, locale || this.locale, _timezone);
        }
        catch (error) {
            throw invalidPipeArgumentError(DatePipe, error.message);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.6", ngImport: i0, type: DatePipe, deps: [{ token: LOCALE_ID }, { token: DATE_PIPE_DEFAULT_TIMEZONE, optional: true }, { token: DATE_PIPE_DEFAULT_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.1.6", ngImport: i0, type: DatePipe, isStandalone: true, name: "date" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.6", ngImport: i0, type: DatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'date',
                    pure: true,
                    standalone: true,
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DATE_PIPE_DEFAULT_TIMEZONE]
                }, {
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DATE_PIPE_DEFAULT_OPTIONS]
                }, {
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZV9waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tbW9uL3NyYy9waXBlcy9kYXRlX3BpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBRS9GLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUUvQyxPQUFPLEVBQWlCLG1CQUFtQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdkUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sK0JBQStCLENBQUM7O0FBRXZFOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsSUFBSSxjQUFjLENBQVMsNEJBQTRCLENBQUMsQ0FBQztBQUVuRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQ2xDLElBQUksY0FBYyxDQUFpQiwyQkFBMkIsQ0FBQyxDQUFDO0FBRXBFLG1CQUFtQjtBQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEpHO0FBQ0gsa0JBQWtCO0FBTWxCLE1BQU0sT0FBTyxRQUFRO0lBQ25CLFlBQytCLE1BQWMsRUFDZSxlQUE2QixFQUM5QixjQUFvQztRQUZoRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Usb0JBQWUsR0FBZixlQUFlLENBQWM7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQXNCO0lBQzVGLENBQUM7SUEyQkosU0FBUyxDQUNMLEtBQXdDLEVBQUUsTUFBZSxFQUFFLFFBQWlCLEVBQzVFLE1BQWU7UUFDakIsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQztRQUVsRSxJQUFJO1lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsVUFBVSxJQUFJLG1CQUFtQixDQUFDO1lBQ2pGLE1BQU0sU0FBUyxHQUNYLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLFNBQVMsQ0FBQztZQUNuRixPQUFPLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3JFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLHdCQUF3QixDQUFDLFFBQVEsRUFBRyxLQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDcEU7SUFDSCxDQUFDO3lIQTdDVSxRQUFRLGtCQUVQLFNBQVMsYUFDVCwwQkFBMEIsNkJBQzFCLHlCQUF5Qjt1SEFKMUIsUUFBUTs7c0dBQVIsUUFBUTtrQkFMcEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsSUFBSTtvQkFDVixVQUFVLEVBQUUsSUFBSTtpQkFDakI7OzBCQUdNLE1BQU07MkJBQUMsU0FBUzs7MEJBQ2hCLE1BQU07MkJBQUMsMEJBQTBCOzswQkFBRyxRQUFROzswQkFDNUMsTUFBTTsyQkFBQyx5QkFBeUI7OzBCQUFHLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGlvblRva2VuLCBMT0NBTEVfSUQsIE9wdGlvbmFsLCBQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtmb3JtYXREYXRlfSBmcm9tICcuLi9pMThuL2Zvcm1hdF9kYXRlJztcblxuaW1wb3J0IHtEYXRlUGlwZUNvbmZpZywgREVGQVVMVF9EQVRFX0ZPUk1BVH0gZnJvbSAnLi9kYXRlX3BpcGVfY29uZmlnJztcbmltcG9ydCB7aW52YWxpZFBpcGVBcmd1bWVudEVycm9yfSBmcm9tICcuL2ludmFsaWRfcGlwZV9hcmd1bWVudF9lcnJvcic7XG5cbi8qKlxuICogT3B0aW9uYWxseS1wcm92aWRlZCBkZWZhdWx0IHRpbWV6b25lIHRvIHVzZSBmb3IgYWxsIGluc3RhbmNlcyBvZiBgRGF0ZVBpcGVgIChzdWNoIGFzIGAnKzA0MzAnYCkuXG4gKiBJZiB0aGUgdmFsdWUgaXNuJ3QgcHJvdmlkZWQsIHRoZSBgRGF0ZVBpcGVgIHdpbGwgdXNlIHRoZSBlbmQtdXNlcidzIGxvY2FsIHN5c3RlbSB0aW1lem9uZS5cbiAqXG4gKiBAZGVwcmVjYXRlZCB1c2UgREFURV9QSVBFX0RFRkFVTFRfT1BUSU9OUyB0b2tlbiB0byBjb25maWd1cmUgRGF0ZVBpcGVcbiAqL1xuZXhwb3J0IGNvbnN0IERBVEVfUElQRV9ERUZBVUxUX1RJTUVaT05FID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ0RBVEVfUElQRV9ERUZBVUxUX1RJTUVaT05FJyk7XG5cbi8qKlxuICogREkgdG9rZW4gdGhhdCBhbGxvd3MgdG8gcHJvdmlkZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBgRGF0ZVBpcGVgIGluc3RhbmNlcyBpbiBhblxuICogYXBwbGljYXRpb24uIFRoZSB2YWx1ZSBpcyBhbiBvYmplY3Qgd2hpY2ggY2FuIGluY2x1ZGUgdGhlIGZvbGxvd2luZyBmaWVsZHM6XG4gKiAtIGBkYXRlRm9ybWF0YDogY29uZmlndXJlcyB0aGUgZGVmYXVsdCBkYXRlIGZvcm1hdC4gSWYgbm90IHByb3ZpZGVkLCB0aGUgYERhdGVQaXBlYFxuICogd2lsbCB1c2UgdGhlICdtZWRpdW1EYXRlJyBhcyBhIHZhbHVlLlxuICogLSBgdGltZXpvbmVgOiBjb25maWd1cmVzIHRoZSBkZWZhdWx0IHRpbWV6b25lLiBJZiBub3QgcHJvdmlkZWQsIHRoZSBgRGF0ZVBpcGVgIHdpbGxcbiAqIHVzZSB0aGUgZW5kLXVzZXIncyBsb2NhbCBzeXN0ZW0gdGltZXpvbmUuXG4gKlxuICogQHNlZSB7QGxpbmsgRGF0ZVBpcGVDb25maWd9XG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBWYXJpb3VzIGRhdGUgcGlwZSBkZWZhdWx0IHZhbHVlcyBjYW4gYmUgb3ZlcndyaXR0ZW4gYnkgcHJvdmlkaW5nIHRoaXMgdG9rZW4gd2l0aFxuICogdGhlIHZhbHVlIHRoYXQgaGFzIHRoaXMgaW50ZXJmYWNlLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqIE92ZXJyaWRlIHRoZSBkZWZhdWx0IGRhdGUgZm9ybWF0IGJ5IHByb3ZpZGluZyBhIHZhbHVlIHVzaW5nIHRoZSB0b2tlbjpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHByb3ZpZGVyczogW1xuICogICB7cHJvdmlkZTogREFURV9QSVBFX0RFRkFVTFRfT1BUSU9OUywgdXNlVmFsdWU6IHtkYXRlRm9ybWF0OiAnc2hvcnREYXRlJ319XG4gKiBdXG4gKiBgYGBcbiAqXG4gKiBPdmVycmlkZSB0aGUgZGVmYXVsdCB0aW1lem9uZSBieSBwcm92aWRpbmcgYSB2YWx1ZSB1c2luZyB0aGUgdG9rZW46XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBwcm92aWRlcnM6IFtcbiAqICAge3Byb3ZpZGU6IERBVEVfUElQRV9ERUZBVUxUX09QVElPTlMsIHVzZVZhbHVlOiB7dGltZXpvbmU6ICctMTIwMCd9fVxuICogXVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBEQVRFX1BJUEVfREVGQVVMVF9PUFRJT05TID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48RGF0ZVBpcGVDb25maWc+KCdEQVRFX1BJUEVfREVGQVVMVF9PUFRJT05TJyk7XG5cbi8vIGNsYW5nLWZvcm1hdCBvZmZcbi8qKlxuICogQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogRm9ybWF0cyBhIGRhdGUgdmFsdWUgYWNjb3JkaW5nIHRvIGxvY2FsZSBydWxlcy5cbiAqXG4gKiBgRGF0ZVBpcGVgIGlzIGV4ZWN1dGVkIG9ubHkgd2hlbiBpdCBkZXRlY3RzIGEgcHVyZSBjaGFuZ2UgdG8gdGhlIGlucHV0IHZhbHVlLlxuICogQSBwdXJlIGNoYW5nZSBpcyBlaXRoZXIgYSBjaGFuZ2UgdG8gYSBwcmltaXRpdmUgaW5wdXQgdmFsdWVcbiAqIChzdWNoIGFzIGBTdHJpbmdgLCBgTnVtYmVyYCwgYEJvb2xlYW5gLCBvciBgU3ltYm9sYCksXG4gKiBvciBhIGNoYW5nZWQgb2JqZWN0IHJlZmVyZW5jZSAoc3VjaCBhcyBgRGF0ZWAsIGBBcnJheWAsIGBGdW5jdGlvbmAsIG9yIGBPYmplY3RgKS5cbiAqXG4gKiBOb3RlIHRoYXQgbXV0YXRpbmcgYSBgRGF0ZWAgb2JqZWN0IGRvZXMgbm90IGNhdXNlIHRoZSBwaXBlIHRvIGJlIHJlbmRlcmVkIGFnYWluLlxuICogVG8gZW5zdXJlIHRoYXQgdGhlIHBpcGUgaXMgZXhlY3V0ZWQsIHlvdSBtdXN0IGNyZWF0ZSBhIG5ldyBgRGF0ZWAgb2JqZWN0LlxuICpcbiAqIE9ubHkgdGhlIGBlbi1VU2AgbG9jYWxlIGRhdGEgY29tZXMgd2l0aCBBbmd1bGFyLiBUbyBsb2NhbGl6ZSBkYXRlc1xuICogaW4gYW5vdGhlciBsYW5ndWFnZSwgeW91IG11c3QgaW1wb3J0IHRoZSBjb3JyZXNwb25kaW5nIGxvY2FsZSBkYXRhLlxuICogU2VlIHRoZSBbSTE4biBndWlkZV0oZ3VpZGUvaTE4bi1jb21tb24tZm9ybWF0LWRhdGEtbG9jYWxlKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBUaGUgdGltZSB6b25lIG9mIHRoZSBmb3JtYXR0ZWQgdmFsdWUgY2FuIGJlIHNwZWNpZmllZCBlaXRoZXIgYnkgcGFzc2luZyBpdCBpbiBhcyB0aGUgc2Vjb25kXG4gKiBwYXJhbWV0ZXIgb2YgdGhlIHBpcGUsIG9yIGJ5IHNldHRpbmcgdGhlIGRlZmF1bHQgdGhyb3VnaCB0aGUgYERBVEVfUElQRV9ERUZBVUxUX09QVElPTlNgXG4gKiBpbmplY3Rpb24gdG9rZW4uIFRoZSB2YWx1ZSB0aGF0IGlzIHBhc3NlZCBpbiBhcyB0aGUgc2Vjb25kIHBhcmFtZXRlciB0YWtlcyBwcmVjZWRlbmNlIG92ZXJcbiAqIHRoZSBvbmUgZGVmaW5lZCB1c2luZyB0aGUgaW5qZWN0aW9uIHRva2VuLlxuICpcbiAqIEBzZWUge0BsaW5rIGZvcm1hdERhdGV9XG4gKlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogVGhlIHJlc3VsdCBvZiB0aGlzIHBpcGUgaXMgbm90IHJlZXZhbHVhdGVkIHdoZW4gdGhlIGlucHV0IGlzIG11dGF0ZWQuIFRvIGF2b2lkIHRoZSBuZWVkIHRvXG4gKiByZWZvcm1hdCB0aGUgZGF0ZSBvbiBldmVyeSBjaGFuZ2UtZGV0ZWN0aW9uIGN5Y2xlLCB0cmVhdCB0aGUgZGF0ZSBhcyBhbiBpbW11dGFibGUgb2JqZWN0XG4gKiBhbmQgY2hhbmdlIHRoZSByZWZlcmVuY2Ugd2hlbiB0aGUgcGlwZSBuZWVkcyB0byBydW4gYWdhaW4uXG4gKlxuICogIyMjIFByZS1kZWZpbmVkIGZvcm1hdCBvcHRpb25zXG4gKlxuICogfCBPcHRpb24gICAgICAgIHwgRXF1aXZhbGVudCB0byAgICAgICAgICAgICAgICAgICAgICAgfCBFeGFtcGxlcyAoZ2l2ZW4gaW4gYGVuLVVTYCBsb2NhbGUpICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgYCdzaG9ydCdgICAgICB8IGAnTS9kL3l5LCBoOm1tIGEnYCAgICAgICAgICAgICAgICAgIHwgYDYvMTUvMTUsIDk6MDMgQU1gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCBgJ21lZGl1bSdgICAgIHwgYCdNTU0gZCwgeSwgaDptbTpzcyBhJ2AgICAgICAgICAgICAgfCBgSnVuIDE1LCAyMDE1LCA5OjAzOjAxIEFNYCAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IGAnbG9uZydgICAgICAgfCBgJ01NTU0gZCwgeSwgaDptbTpzcyBhIHonYCAgICAgICAgICB8IGBKdW5lIDE1LCAyMDE1IGF0IDk6MDM6MDEgQU0gR01UKzFgICAgICAgICAgICAgIHxcbiAqIHwgYCdmdWxsJ2AgICAgICB8IGAnRUVFRSwgTU1NTSBkLCB5LCBoOm1tOnNzIGEgenp6eidgIHwgYE1vbmRheSwgSnVuZSAxNSwgMjAxNSBhdCA5OjAzOjAxIEFNIEdNVCswMTowMGAgfFxuICogfCBgJ3Nob3J0RGF0ZSdgIHwgYCdNL2QveXknYCAgICAgICAgICAgICAgICAgICAgICAgICAgfCBgNi8xNS8xNWAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IGAnbWVkaXVtRGF0ZSdgfCBgJ01NTSBkLCB5J2AgICAgICAgICAgICAgICAgICAgICAgICB8IGBKdW4gMTUsIDIwMTVgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgYCdsb25nRGF0ZSdgICB8IGAnTU1NTSBkLCB5J2AgICAgICAgICAgICAgICAgICAgICAgIHwgYEp1bmUgMTUsIDIwMTVgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCBgJ2Z1bGxEYXRlJ2AgIHwgYCdFRUVFLCBNTU1NIGQsIHknYCAgICAgICAgICAgICAgICAgfCBgTW9uZGF5LCBKdW5lIDE1LCAyMDE1YCAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IGAnc2hvcnRUaW1lJ2AgfCBgJ2g6bW0gYSdgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGA5OjAzIEFNYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgYCdtZWRpdW1UaW1lJ2B8IGAnaDptbTpzcyBhJ2AgICAgICAgICAgICAgICAgICAgICAgIHwgYDk6MDM6MDEgQU1gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCBgJ2xvbmdUaW1lJ2AgIHwgYCdoOm1tOnNzIGEgeidgICAgICAgICAgICAgICAgICAgICAgfCBgOTowMzowMSBBTSBHTVQrMWAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IGAnZnVsbFRpbWUnYCAgfCBgJ2g6bW06c3MgYSB6enp6J2AgICAgICAgICAgICAgICAgICB8IGA5OjAzOjAxIEFNIEdNVCswMTowMGAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqXG4gKiAjIyMgQ3VzdG9tIGZvcm1hdCBvcHRpb25zXG4gKlxuICogWW91IGNhbiBjb25zdHJ1Y3QgYSBmb3JtYXQgc3RyaW5nIHVzaW5nIHN5bWJvbHMgdG8gc3BlY2lmeSB0aGUgY29tcG9uZW50c1xuICogb2YgYSBkYXRlLXRpbWUgdmFsdWUsIGFzIGRlc2NyaWJlZCBpbiB0aGUgZm9sbG93aW5nIHRhYmxlLlxuICogRm9ybWF0IGRldGFpbHMgZGVwZW5kIG9uIHRoZSBsb2NhbGUuXG4gKiBGaWVsZHMgbWFya2VkIHdpdGggKCopIGFyZSBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgZXh0cmEgZGF0YSBzZXQgZm9yIHRoZSBnaXZlbiBsb2NhbGUuXG4gKlxuICogIHwgRmllbGQgdHlwZSAgICAgICAgICB8IEZvcm1hdCAgICAgIHwgRGVzY3JpcHRpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEV4YW1wbGUgVmFsdWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwtLS0tLS0tLS0tLS0tLS0tLS0tLSB8LS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogIHwgRXJhICAgICAgICAgICAgICAgICB8IEcsIEdHICYgR0dHIHwgQWJicmV2aWF0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEFEICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IEdHR0cgICAgICAgIHwgV2lkZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEFubm8gRG9taW5pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IEdHR0dHICAgICAgIHwgTmFycm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgWWVhciAgICAgICAgICAgICAgICB8IHkgICAgICAgICAgIHwgTnVtZXJpYzogbWluaW11bSBkaWdpdHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDIsIDIwLCAyMDEsIDIwMTcsIDIwMTczICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IHl5ICAgICAgICAgIHwgTnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAyLCAyMCwgMDEsIDE3LCA3MyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IHl5eSAgICAgICAgIHwgTnVtZXJpYzogMyBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAwMiwgMDIwLCAyMDEsIDIwMTcsIDIwMTczICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IHl5eXkgICAgICAgIHwgTnVtZXJpYzogNCBkaWdpdHMgb3IgbW9yZSArIHplcm8gcGFkZGVkICAgICAgICAgICAgICAgICAgICAgICB8IDAwMDIsIDAwMjAsIDAyMDEsIDIwMTcsIDIwMTczICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgV2Vlay1udW1iZXJpbmcgeWVhciB8IFkgICAgICAgICAgIHwgTnVtZXJpYzogbWluaW11bSBkaWdpdHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDIsIDIwLCAyMDEsIDIwMTcsIDIwMTczICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IFlZICAgICAgICAgIHwgTnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAyLCAyMCwgMDEsIDE3LCA3MyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IFlZWSAgICAgICAgIHwgTnVtZXJpYzogMyBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAwMiwgMDIwLCAyMDEsIDIwMTcsIDIwMTczICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IFlZWVkgICAgICAgIHwgTnVtZXJpYzogNCBkaWdpdHMgb3IgbW9yZSArIHplcm8gcGFkZGVkICAgICAgICAgICAgICAgICAgICAgICB8IDAwMDIsIDAwMjAsIDAyMDEsIDIwMTcsIDIwMTczICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgTW9udGggICAgICAgICAgICAgICB8IE0gICAgICAgICAgIHwgTnVtZXJpYzogMSBkaWdpdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDksIDEyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IE1NICAgICAgICAgIHwgTnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDA5LCAxMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IE1NTSAgICAgICAgIHwgQWJicmV2aWF0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNlcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IE1NTU0gICAgICAgIHwgV2lkZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNlcHRlbWJlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IE1NTU1NICAgICAgIHwgTmFycm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgTW9udGggc3RhbmRhbG9uZSAgICB8IEwgICAgICAgICAgIHwgTnVtZXJpYzogMSBkaWdpdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDksIDEyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IExMICAgICAgICAgIHwgTnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDA5LCAxMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IExMTCAgICAgICAgIHwgQWJicmV2aWF0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNlcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IExMTEwgICAgICAgIHwgV2lkZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNlcHRlbWJlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IExMTExMICAgICAgIHwgTmFycm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgV2VlayBvZiB5ZWFyICAgICAgICB8IHcgICAgICAgICAgIHwgTnVtZXJpYzogbWluaW11bSBkaWdpdHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDEuLi4gNTMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IHd3ICAgICAgICAgIHwgTnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAxLi4uIDUzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgV2VlayBvZiBtb250aCAgICAgICB8IFcgICAgICAgICAgIHwgTnVtZXJpYzogMSBkaWdpdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDEuLi4gNSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgRGF5IG9mIG1vbnRoICAgICAgICB8IGQgICAgICAgICAgIHwgTnVtZXJpYzogbWluaW11bSBkaWdpdHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IGRkICAgICAgICAgIHwgTnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgV2VlayBkYXkgICAgICAgICAgICB8IEUsIEVFICYgRUVFIHwgQWJicmV2aWF0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFR1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IEVFRUUgICAgICAgIHwgV2lkZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFR1ZXNkYXkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IEVFRUVFICAgICAgIHwgTmFycm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IEVFRUVFRSAgICAgIHwgU2hvcnQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFR1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgV2VlayBkYXkgc3RhbmRhbG9uZSB8IGMsIGNjICAgICAgIHwgTnVtZXJpYzogMSBkaWdpdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IGNjYyAgICAgICAgIHwgQWJicmV2aWF0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFR1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IGNjY2MgICAgICAgIHwgV2lkZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFR1ZXNkYXkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IGNjY2NjICAgICAgIHwgTmFycm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IGNjY2NjYyAgICAgIHwgU2hvcnQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFR1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgUGVyaW9kICAgICAgICAgICAgICB8IGEsIGFhICYgYWFhIHwgQWJicmV2aWF0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFtL3BtIG9yIEFNL1BNICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IGFhYWEgICAgICAgIHwgV2lkZSAoZmFsbGJhY2sgdG8gYGFgIHdoZW4gbWlzc2luZykgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFudGUgbWVyaWRpZW0vcG9zdCBtZXJpZGllbSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IGFhYWFhICAgICAgIHwgTmFycm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGEvcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgUGVyaW9kKiAgICAgICAgICAgICB8IEIsIEJCICYgQkJCIHwgQWJicmV2aWF0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1pZC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IEJCQkIgICAgICAgIHwgV2lkZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFtLCBwbSwgbWlkbmlnaHQsIG5vb24sIG1vcm5pbmcsIGFmdGVybm9vbiwgZXZlbmluZywgbmlnaHQgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IEJCQkJCICAgICAgIHwgTmFycm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgUGVyaW9kIHN0YW5kYWxvbmUqICB8IGIsIGJiICYgYmJiIHwgQWJicmV2aWF0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1pZC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IGJiYmIgICAgICAgIHwgV2lkZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFtLCBwbSwgbWlkbmlnaHQsIG5vb24sIG1vcm5pbmcsIGFmdGVybm9vbiwgZXZlbmluZywgbmlnaHQgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IGJiYmJiICAgICAgIHwgTmFycm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1kICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgSG91ciAxLTEyICAgICAgICAgICB8IGggICAgICAgICAgIHwgTnVtZXJpYzogbWluaW11bSBkaWdpdHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDEsIDEyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IGhoICAgICAgICAgIHwgTnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAxLCAxMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgSG91ciAwLTIzICAgICAgICAgICB8IEggICAgICAgICAgIHwgTnVtZXJpYzogbWluaW11bSBkaWdpdHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAsIDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IEhIICAgICAgICAgIHwgTnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAwLCAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgTWludXRlICAgICAgICAgICAgICB8IG0gICAgICAgICAgIHwgTnVtZXJpYzogbWluaW11bSBkaWdpdHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDgsIDU5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IG1tICAgICAgICAgIHwgTnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDA4LCA1OSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgU2Vjb25kICAgICAgICAgICAgICB8IHMgICAgICAgICAgIHwgTnVtZXJpYzogbWluaW11bSBkaWdpdHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAuLi4gNTkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IHNzICAgICAgICAgIHwgTnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAwLi4uIDU5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgRnJhY3Rpb25hbCBzZWNvbmRzICB8IFMgICAgICAgICAgIHwgTnVtZXJpYzogMSBkaWdpdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAuLi4gOSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IFNTICAgICAgICAgIHwgTnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDAwLi4uIDk5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IFNTUyAgICAgICAgIHwgTnVtZXJpYzogMyBkaWdpdHMgKyB6ZXJvIHBhZGRlZCAoPSBtaWxsaXNlY29uZHMpICAgICAgICAgICAgICB8IDAwMC4uLiA5OTkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgWm9uZSAgICAgICAgICAgICAgICB8IHosIHp6ICYgenp6IHwgU2hvcnQgc3BlY2lmaWMgbm9uIGxvY2F0aW9uIGZvcm1hdCAoZmFsbGJhY2sgdG8gTykgICAgICAgICAgICB8IEdNVC04ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IHp6enogICAgICAgIHwgTG9uZyBzcGVjaWZpYyBub24gbG9jYXRpb24gZm9ybWF0IChmYWxsYmFjayB0byBPT09PKSAgICAgICAgICB8IEdNVC0wODowMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IFosIFpaICYgWlpaIHwgSVNPODYwMSBiYXNpYyBmb3JtYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IC0wODAwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IFpaWlogICAgICAgIHwgTG9uZyBsb2NhbGl6ZWQgR01UIGZvcm1hdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEdNVC04OjAwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IFpaWlpaICAgICAgIHwgSVNPODYwMSBleHRlbmRlZCBmb3JtYXQgKyBaIGluZGljYXRvciBmb3Igb2Zmc2V0IDAgKD0gWFhYWFgpICB8IC0wODowMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IE8sIE9PICYgT09PIHwgU2hvcnQgbG9jYWxpemVkIEdNVCBmb3JtYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEdNVC04ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICB8IE9PT08gICAgICAgIHwgTG9uZyBsb2NhbGl6ZWQgR01UIGZvcm1hdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEdNVC0wODowMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICpcbiAqXG4gKiAjIyMgRm9ybWF0IGV4YW1wbGVzXG4gKlxuICogVGhlc2UgZXhhbXBsZXMgdHJhbnNmb3JtIGEgZGF0ZSBpbnRvIHZhcmlvdXMgZm9ybWF0cyxcbiAqIGFzc3VtaW5nIHRoYXQgYGRhdGVPYmpgIGlzIGEgSmF2YVNjcmlwdCBgRGF0ZWAgb2JqZWN0IGZvclxuICogeWVhcjogMjAxNSwgbW9udGg6IDYsIGRheTogMTUsIGhvdXI6IDIxLCBtaW51dGU6IDQzLCBzZWNvbmQ6IDExLFxuICogZ2l2ZW4gaW4gdGhlIGxvY2FsIHRpbWUgZm9yIHRoZSBgZW4tVVNgIGxvY2FsZS5cbiAqXG4gKiBgYGBcbiAqIHt7IGRhdGVPYmogfCBkYXRlIH19ICAgICAgICAgICAgICAgLy8gb3V0cHV0IGlzICdKdW4gMTUsIDIwMTUnXG4gKiB7eyBkYXRlT2JqIHwgZGF0ZTonbWVkaXVtJyB9fSAgICAgIC8vIG91dHB1dCBpcyAnSnVuIDE1LCAyMDE1LCA5OjQzOjExIFBNJ1xuICoge3sgZGF0ZU9iaiB8IGRhdGU6J3Nob3J0VGltZScgfX0gICAvLyBvdXRwdXQgaXMgJzk6NDMgUE0nXG4gKiB7eyBkYXRlT2JqIHwgZGF0ZTonbW06c3MnIH19ICAgICAgIC8vIG91dHB1dCBpcyAnNDM6MTEnXG4gKiBgYGBcbiAqXG4gKiAjIyMgVXNhZ2UgZXhhbXBsZVxuICpcbiAqIFRoZSBmb2xsb3dpbmcgY29tcG9uZW50IHVzZXMgYSBkYXRlIHBpcGUgdG8gZGlzcGxheSB0aGUgY3VycmVudCBkYXRlIGluIGRpZmZlcmVudCBmb3JtYXRzLlxuICpcbiAqIGBgYFxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdkYXRlLXBpcGUnLFxuICogIHRlbXBsYXRlOiBgPGRpdj5cbiAqICAgIDxwPlRvZGF5IGlzIHt7dG9kYXkgfCBkYXRlfX08L3A+XG4gKiAgICA8cD5PciBpZiB5b3UgcHJlZmVyLCB7e3RvZGF5IHwgZGF0ZTonZnVsbERhdGUnfX08L3A+XG4gKiAgICA8cD5UaGUgdGltZSBpcyB7e3RvZGF5IHwgZGF0ZTonaDptbSBhIHonfX08L3A+XG4gKiAgPC9kaXY+YFxuICogfSlcbiAqIC8vIEdldCB0aGUgY3VycmVudCBkYXRlIGFuZCB0aW1lIGFzIGEgZGF0ZS10aW1lIHZhbHVlLlxuICogZXhwb3J0IGNsYXNzIERhdGVQaXBlQ29tcG9uZW50IHtcbiAqICAgdG9kYXk6IG51bWJlciA9IERhdGUubm93KCk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbi8vIGNsYW5nLWZvcm1hdCBvblxuQFBpcGUoe1xuICBuYW1lOiAnZGF0ZScsXG4gIHB1cmU6IHRydWUsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcsXG4gICAgICBASW5qZWN0KERBVEVfUElQRV9ERUZBVUxUX1RJTUVaT05FKSBAT3B0aW9uYWwoKSBwcml2YXRlIGRlZmF1bHRUaW1lem9uZT86IHN0cmluZ3xudWxsLFxuICAgICAgQEluamVjdChEQVRFX1BJUEVfREVGQVVMVF9PUFRJT05TKSBAT3B0aW9uYWwoKSBwcml2YXRlIGRlZmF1bHRPcHRpb25zPzogRGF0ZVBpcGVDb25maWd8bnVsbCxcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIGRhdGUgZXhwcmVzc2lvbjogYSBgRGF0ZWAgb2JqZWN0LCAgYSBudW1iZXJcbiAgICogKG1pbGxpc2Vjb25kcyBzaW5jZSBVVEMgZXBvY2gpLCBvciBhbiBJU08gc3RyaW5nIChodHRwczovL3d3dy53My5vcmcvVFIvTk9URS1kYXRldGltZSkuXG4gICAqIEBwYXJhbSBmb3JtYXQgVGhlIGRhdGUvdGltZSBjb21wb25lbnRzIHRvIGluY2x1ZGUsIHVzaW5nIHByZWRlZmluZWQgb3B0aW9ucyBvciBhXG4gICAqIGN1c3RvbSBmb3JtYXQgc3RyaW5nLiAgV2hlbiBub3QgcHJvdmlkZWQsIHRoZSBgRGF0ZVBpcGVgIGxvb2tzIGZvciB0aGUgdmFsdWUgdXNpbmcgdGhlXG4gICAqIGBEQVRFX1BJUEVfREVGQVVMVF9PUFRJT05TYCBpbmplY3Rpb24gdG9rZW4gKGFuZCByZWFkcyB0aGUgYGRhdGVGb3JtYXRgIHByb3BlcnR5KS5cbiAgICogSWYgdGhlIHRva2VuIGlzIG5vdCBjb25maWd1cmVkLCB0aGUgYG1lZGl1bURhdGVgIGlzIHVzZWQgYXMgYSB2YWx1ZS5cbiAgICogQHBhcmFtIHRpbWV6b25lIEEgdGltZXpvbmUgb2Zmc2V0IChzdWNoIGFzIGAnKzA0MzAnYCksIG9yIGEgc3RhbmRhcmQgVVRDL0dNVCwgb3IgY29udGluZW50YWwgVVNcbiAgICogdGltZXpvbmUgYWJicmV2aWF0aW9uLiBXaGVuIG5vdCBwcm92aWRlZCwgdGhlIGBEYXRlUGlwZWAgbG9va3MgZm9yIHRoZSB2YWx1ZSB1c2luZyB0aGVcbiAgICogYERBVEVfUElQRV9ERUZBVUxUX09QVElPTlNgIGluamVjdGlvbiB0b2tlbiAoYW5kIHJlYWRzIHRoZSBgdGltZXpvbmVgIHByb3BlcnR5KS4gSWYgdGhlIHRva2VuXG4gICAqIGlzIG5vdCBjb25maWd1cmVkLCB0aGUgZW5kLXVzZXIncyBsb2NhbCBzeXN0ZW0gdGltZXpvbmUgaXMgdXNlZCBhcyBhIHZhbHVlLlxuICAgKiBAcGFyYW0gbG9jYWxlIEEgbG9jYWxlIGNvZGUgZm9yIHRoZSBsb2NhbGUgZm9ybWF0IHJ1bGVzIHRvIHVzZS5cbiAgICogV2hlbiBub3Qgc3VwcGxpZWQsIHVzZXMgdGhlIHZhbHVlIG9mIGBMT0NBTEVfSURgLCB3aGljaCBpcyBgZW4tVVNgIGJ5IGRlZmF1bHQuXG4gICAqIFNlZSBbU2V0dGluZyB5b3VyIGFwcCBsb2NhbGVdKGd1aWRlL2kxOG4tY29tbW9uLWxvY2FsZS1pZCkuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIERBVEVfUElQRV9ERUZBVUxUX09QVElPTlN9XG4gICAqXG4gICAqIEByZXR1cm5zIEEgZGF0ZSBzdHJpbmcgaW4gdGhlIGRlc2lyZWQgZm9ybWF0LlxuICAgKi9cbiAgdHJhbnNmb3JtKHZhbHVlOiBEYXRlfHN0cmluZ3xudW1iZXIsIGZvcm1hdD86IHN0cmluZywgdGltZXpvbmU/OiBzdHJpbmcsIGxvY2FsZT86IHN0cmluZyk6IHN0cmluZ1xuICAgICAgfG51bGw7XG4gIHRyYW5zZm9ybSh2YWx1ZTogbnVsbHx1bmRlZmluZWQsIGZvcm1hdD86IHN0cmluZywgdGltZXpvbmU/OiBzdHJpbmcsIGxvY2FsZT86IHN0cmluZyk6IG51bGw7XG4gIHRyYW5zZm9ybShcbiAgICAgIHZhbHVlOiBEYXRlfHN0cmluZ3xudW1iZXJ8bnVsbHx1bmRlZmluZWQsIGZvcm1hdD86IHN0cmluZywgdGltZXpvbmU/OiBzdHJpbmcsXG4gICAgICBsb2NhbGU/OiBzdHJpbmcpOiBzdHJpbmd8bnVsbDtcbiAgdHJhbnNmb3JtKFxuICAgICAgdmFsdWU6IERhdGV8c3RyaW5nfG51bWJlcnxudWxsfHVuZGVmaW5lZCwgZm9ybWF0Pzogc3RyaW5nLCB0aW1lem9uZT86IHN0cmluZyxcbiAgICAgIGxvY2FsZT86IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycgfHwgdmFsdWUgIT09IHZhbHVlKSByZXR1cm4gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBfZm9ybWF0ID0gZm9ybWF0ID8/IHRoaXMuZGVmYXVsdE9wdGlvbnM/LmRhdGVGb3JtYXQgPz8gREVGQVVMVF9EQVRFX0ZPUk1BVDtcbiAgICAgIGNvbnN0IF90aW1lem9uZSA9XG4gICAgICAgICAgdGltZXpvbmUgPz8gdGhpcy5kZWZhdWx0T3B0aW9ucz8udGltZXpvbmUgPz8gdGhpcy5kZWZhdWx0VGltZXpvbmUgPz8gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIGZvcm1hdERhdGUodmFsdWUsIF9mb3JtYXQsIGxvY2FsZSB8fCB0aGlzLmxvY2FsZSwgX3RpbWV6b25lKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgaW52YWxpZFBpcGVBcmd1bWVudEVycm9yKERhdGVQaXBlLCAoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuIl19