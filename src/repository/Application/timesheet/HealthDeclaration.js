import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const healthDeclaration = async ({
    Sot,
    Ho,
    KhoTho,
    ViemPhoi,
    MetMoi,
    TiepXucNguoiBenh,
    HasF,
    TiepXucNguoiTuNuocCoBenh,
    TiepXucNguoiSot,
    GanManTinh,
    MauManTinh,
    PhoiManTinh,
    ThanManTinh,
    TimMach,
    HuyetApCao,
    SuyGiamMienDich,
    NguoiNhanGhepTang,
    TieuDuong,
    UngThu,
    ThoiGianThaiKy,
    DiChuyenNuocNgoai,
    DiChuyenTrongNuoc,
    phuongTienDiChuyen,
    noiDi,
    noiDen,
    NgayKhoiHanhStr,
    NgayToiStr,
    LichTrinhDiChuyen,
    Username,
    access_token,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            Sot: Sot,
            Ho: Ho,
            KhoTho: KhoTho,
            ViemPhoi: ViemPhoi,
            MetMoi: MetMoi,
            TiepXucNguoiBenh: TiepXucNguoiBenh,
            HasF: HasF,
            TiepXucNguoiTuNuocCoBenh: TiepXucNguoiTuNuocCoBenh,
            TiepXucNguoiSot: TiepXucNguoiSot,
            GanManTinh: GanManTinh,
            MauManTinh: MauManTinh,
            PhoiManTinh: PhoiManTinh,
            ThanManTinh: ThanManTinh,
            TimMach: TimMach,
            HuyetApCao: HuyetApCao,
            SuyGiamMienDich: SuyGiamMienDich,
            NguoiNhanGhepTang: NguoiNhanGhepTang,
            TieuDuong: TieuDuong,
            UngThu: UngThu,
            ThoiGianThaiKy: ThoiGianThaiKy,
            DiChuyenNuocNgoai: DiChuyenNuocNgoai,
            DiChuyenTrongNuoc: DiChuyenTrongNuoc,
            phuongTienDiChuyen: phuongTienDiChuyen,
            noiDi: noiDi,
            noiDen: noiDen,
            NgayKhoiHanhStr: NgayKhoiHanhStr,
            NgayToiStr: NgayToiStr,
            LichTrinhDiChuyen: LichTrinhDiChuyen,
            Username: Username,
            access_token: access_token,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/employee/get_vn_state',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.data);
                } else {
                    handleError(res.result);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

healthDeclaration.propTypes = {
    Sot: PropTypes.bool.isRequired,
    Ho: PropTypes.bool.isRequired,
    KhoTho: PropTypes.bool.isRequired,
    ViemPhoi: PropTypes.bool.isRequired,
    MetMoi: PropTypes.bool.isRequired,
    TiepXucNguoiBenh: PropTypes.bool.isRequired,
    HasF: PropTypes.string.isRequired,
    TiepXucNguoiTuNuocCoBenh: PropTypes.bool.isRequired,
    TiepXucNguoiSot: PropTypes.bool.isRequired,
    GanManTinh: PropTypes.bool.isRequired,
    MauManTinh: PropTypes.bool.isRequired,
    PhoiManTinh: PropTypes.bool.isRequired,
    ThanManTinh: PropTypes.bool.isRequired,
    TimMach: PropTypes.bool.isRequired,
    HuyetApCao: PropTypes.bool.isRequired,
    SuyGiamMienDich: PropTypes.bool.isRequired,
    NguoiNhanGhepTang: PropTypes.bool.isRequired,
    TieuDuong: PropTypes.bool.isRequired,
    UngThu: PropTypes.bool.isRequired,
    ThoiGianThaiKy: PropTypes.bool.isRequired,
    DiChuyenNuocNgoai: PropTypes.bool.isRequired,
    DiChuyenTrongNuoc: PropTypes.bool.isRequired,
    phuongTienDiChuyen: PropTypes.string.isRequired,
    noiDi: PropTypes.string.isRequired,
    noiDen: PropTypes.string.isRequired,
    NgayKhoiHanhStr: PropTypes.string.isRequired,
    NgayToiStr: PropTypes.string.isRequired,
    LichTrinhDiChuyen: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    access_token: PropTypes.string.isRequired,
};

export const getProvince = async () =>
    new Promise((handleSuccess, handleError) => {
        let body = {};
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/employee/get_vn_state',
            options,
            (res) => {
                if (res.result !== undefined && res.result.code === 200) {
                    handleSuccess(res.result.data);
                } else {
                    handleError(res.result);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });
